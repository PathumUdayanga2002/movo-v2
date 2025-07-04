
const axios = require("axios");

const ESP32_URL = process.env.ESP32_URL;

// utility
const esp32Call = async (path) => {
  try {
    await axios.post(`${ESP32_URL}${path}`, null, { timeout: 2000 });
    console.log(`✅  Forwarded to ESP32: ${path}`);
  } catch (err) {
    console.error(`⚠️  ESP32 call failed (${path}):`, err.message);
  }
};


let countdown = {
  time: 0,
  isRunning: false,
};
let timerInterval = null;



const startCountdown = async (req, res) => {
  const io = req.io; // Access Socket.IO from the request object
  if (!countdown.isRunning) {
    countdown.isRunning = true;
    io.emit("updateCountdown", countdown);// Notify clients

  /* NEW: tell ESP32 to start */
    await esp32Call("/start");

    timerInterval = setInterval(() => {
      if (countdown.time > 0) {
        countdown.time -= 1;
        io.emit("updateCountdown", countdown);
      } else {
        clearInterval(timerInterval);
        countdown.isRunning = false;
        io.emit("updateCountdown", countdown); // Final update
      }
    }, 1000);
    res.status(200).send({ message: "Countdown started" });
  } else {
    res.status(400).send({ message: "Countdown is already running" });
  }
};

const stopCountdown = async (req, res) => {
  const io = req.io; // Access Socket.IO from the request object
  if (countdown.isRunning) {
    countdown.isRunning = false;
    clearInterval(timerInterval);
    io.emit("updateCountdown", countdown); // Notify clients

    
    /* NEW: tell ESP32 to stop */
    await esp32Call("/stop");

    res.status(200).send({ message: "Countdown stopped" });
  } else {
    res.status(400).send({ message: "Countdown is not running" });
  }
};

const setCountdown = async(req, res) => {
  const io = req.io; // Access Socket.IO from the request object
  const { time } = req.body;
  if (typeof time === "number" && time >= 0) {
    countdown.time = time;
    countdown.isRunning = false;
    clearInterval(timerInterval);
    io.emit("updateCountdown", countdown); // Notify clients


        /* NEW: forward to ESP32 */
    await esp32Call(`/set-time?seconds=${time}`);

    
    
    // // Send to ESP32 via serial if connected
    // try {
    //   // You would implement serial communication here if needed
    //   console.log(`Sending time to ESP32: ${time}`);
    // } catch (error) {
    //   console.error("Error sending to ESP32:", error);
    // }
    
    // res.status(200).send({ message: "Countdown time set", time: countdown.time });

     res.status(200).send({ message: "time set", time });
  } else {
    res.status(400).send({ message: "Invalid time value" });
  }
};


// Add reset countdown function
const resetCountdown = async (req, res) => {
  const io = req.io; // Access Socket.IO from the request object
  const { time } = req.body;
  
  if (typeof time === "number" && time >= 0) {
    countdown.time = time;
    countdown.isRunning = false;
    clearInterval(timerInterval);
    io.emit("updateCountdown", countdown); // Notify clients
/* NEW: set time on ESP32 as well */
    await esp32Call(`/set-time?seconds=${time}`);
 res.status(200).send({ message: "reset", time });
    // res.status(200).send({ message: "Countdown reset", time: countdown.time });
  } else {
    res.status(400).send({ message: "Invalid time value for reset" });
  }
};

// const getCountdown = (req, res) => {
//   res.status(200).send(countdown);
//   console.log(countdown);
// };
const getCountdown = (req, res) => {
  // Check if the request is for SSE (Server-Sent Events)
  const acceptHeader = req.headers.accept || '';
  
  if (acceptHeader.includes('text/event-stream')) {
    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Send the initial countdown state
    res.write(`data: ${JSON.stringify(countdown)}\n\n`);

    const interval = setInterval(() => {
      res.write(`data: ${JSON.stringify(countdown)}\n\n`);
    }, 1000); // Update every second

    // Cleanup when the client disconnects
    req.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected from real-time countdown updates");
    });
  } else {
    // Regular JSON response for non-SSE requests
    res.status(200).json(countdown);
  }
};


module.exports = { startCountdown, stopCountdown, setCountdown, resetCountdown, getCountdown };
