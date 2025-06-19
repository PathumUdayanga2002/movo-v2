const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Setting up multer for file uploads
const upload = multer({ dest: "uploads/" });

// AssemblyAI API Key from environment variables
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// Define routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const presenterRoutes = require("./routes/presenterRoutes");
const countdownRoutes = require("./routes/countdownRoutes");
const fileRoutes = require("./routes/fileRoutes");
const emailRoutes = require("./routes/emailRoutes");
const uploadDetailsRoutes = require("./routes/uploadDetailsRoutes");
const scheduleRoutes = require('./routes/scheduleRoutes'); // Add this line
const Schedule = require('./models/schedule'); // Import Schedule model



app.use("/api/set-countdown", countdownRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/presenter", presenterRoutes);
app.use("/api/files", fileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/email", emailRoutes);
app.use("/api/upload-details", uploadDetailsRoutes);
app.use('/api/schedules', scheduleRoutes); // Add this line


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Route to handle audio uploads and transcription with AssemblyAI
app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const fileStream = fs.createReadStream(filePath);

    // Upload the audio file to AssemblyAI
    const uploadResponse = await axios.post("https://api.assemblyai.com/v2/upload", fileStream, {
      headers: {
        "authorization": ASSEMBLYAI_API_KEY,
        "transfer-encoding": "chunked",
      },
    });

    const audioUrl = uploadResponse.data.upload_url;

    // Request transcription from AssemblyAI
    const transcriptResponse = await axios.post("https://api.assemblyai.com/v2/transcript", {
      audio_url: audioUrl,
    }, {
      headers: {
        "authorization": ASSEMBLYAI_API_KEY,
      },
    });

    const transcriptId = transcriptResponse.data.id;
    let transcriptStatus;
    let transcriptResult;

    // Polling the transcription result
    do {
      const pollingResponse = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          "authorization": ASSEMBLYAI_API_KEY,
        },
      });

      transcriptStatus = pollingResponse.data.status;

      if (transcriptStatus === 'completed') {
        transcriptResult = pollingResponse.data.text;
      } else if (transcriptStatus === 'failed') {
        throw new Error("Transcription failed");
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } while (transcriptStatus !== 'completed');

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Send the transcription result to the client
    res.json({ transcript: transcriptResult });
  } catch (error) {
    console.error("Error during transcription:", error);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
});

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"]
  }
});

const presentationTimers = {}; // Store timers for active presentations { presentationId: { intervalId, timeLeft, adminSocketId } }

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Join presentation room
  socket.on('join_presentation', async (presentationId) => {
    try {
      const schedule = await Schedule.findOne({ presentationId });
      if (!schedule) {
        socket.emit('join_error', 'Invalid Presentation ID');
        return;
      }
      // TODO: Add validation to check if user (admin/presenter) is allowed to join this specific presentation

      socket.join(presentationId);
      console.log(`User ${socket.id} joined room ${presentationId}`);
      socket.emit('joined_successfully', presentationId);

      // If a timer is already running for this room, send the current time
      if (presentationTimers[presentationId] && presentationTimers[presentationId].intervalId) {
        socket.emit('time_update', presentationTimers[presentationId].timeLeft);
      }

    } catch (error) {
      console.error('Error joining presentation:', error);
      socket.emit('join_error', 'Server error while joining presentation.');
    }
  });

  // Admin starts the presentation timer
  socket.on('start_timer', async ({ presentationId }) => {
    // TODO: Add validation to ensure only the admin for this presentation can start the timer
    // Example validation (requires knowing user role from socket connection, e.g., via auth middleware for sockets):
    // if (socket.userRole !== 'admin') { 
    //   return socket.emit('timer_error', 'Only admins can start the timer.');
    // }

    try {
      const schedule = await Schedule.findOne({ presentationId });
      if (!schedule) {
        socket.emit('timer_error', 'Presentation schedule not found.');
        return;
      }

      // Check if the user starting the timer is associated with this schedule (e.g., the assigned admin or a general admin)
      // This check needs refinement based on how admins are associated with schedules

      if (presentationTimers[presentationId] && presentationTimers[presentationId].intervalId) {
        // Optional: Allow admin to restart? For now, prevent multiple starts.
        socket.emit('timer_error', 'Timer already running for this presentation.');
        return;
      }

      let timeLeft = schedule.duration * 60; // Convert duration (minutes) to seconds
      presentationTimers[presentationId] = {
        intervalId: null,
        timeLeft: timeLeft,
        adminSocketId: socket.id // Store admin socket ID for potential future checks
      };

      console.log(`Timer started for ${presentationId} with duration ${timeLeft} seconds by ${socket.id}`);
      // Emit to specific room
      io.to(presentationId).emit('timer_started', timeLeft);

      const intervalId = setInterval(() => {
        if (presentationTimers[presentationId]) {
          presentationTimers[presentationId].timeLeft -= 1;
          timeLeft = presentationTimers[presentationId].timeLeft;
          // Emit to specific room
          io.to(presentationId).emit('time_update', timeLeft);

          if (timeLeft <= 0) {
            clearInterval(presentationTimers[presentationId].intervalId);
            io.to(presentationId).emit('timer_finished');
            console.log(`Timer finished for ${presentationId}`);
            delete presentationTimers[presentationId]; // Clean up
          }
        } else {
             // This case handles if the presentation was somehow deleted while timer running
             clearInterval(intervalId);
             console.log(`Timer interval cleared for ${presentationId} due to missing timer data.`);
        }
      }, 1000);

      presentationTimers[presentationId].intervalId = intervalId;

    } catch (error) {
      console.error('Error starting timer:', error);
      socket.emit('timer_error', 'Server error while starting timer.');
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    // Optional: Clean up timer if the admin who started it disconnects?
    // Example: Find which presentation timer this socket ID belongs to (if admin) and clear it.
    // for (const presentationId in presentationTimers) {
    //   if (presentationTimers[presentationId].adminSocketId === socket.id) {
    //     console.log(`Admin ${socket.id} disconnected, stopping timer for ${presentationId}`);
    //     clearInterval(presentationTimers[presentationId].intervalId);
    //     io.to(presentationId).emit('timer_stopped_admin_disconnected'); // Inform clients
    //     delete presentationTimers[presentationId];
    //     break;
    //   }
    // }
  });
});

// MongoDB connection setup
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully..."))
  .catch((err) => console.log(err.message));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Server listener (using the http server instance for Socket.IO)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
