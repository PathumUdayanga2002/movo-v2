const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  presenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (assuming presenter is a user)
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  duration: { // Duration in minutes
    type: Number,
    required: true,
  },
  presentationId: {
    type: String,
    required: true,
    unique: true, // Ensure presentation IDs are unique
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Add an index for faster querying by date
scheduleSchema.index({ dateTime: 1 });

module.exports = mongoose.model("Schedule", scheduleSchema);