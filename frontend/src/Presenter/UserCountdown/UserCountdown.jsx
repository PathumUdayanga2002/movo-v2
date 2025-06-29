import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPlay, FaStop, FaRedoAlt, FaRegClock } from "react-icons/fa"; // Added FaRedoAlt for reset icon
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // Circular progress bar
import "react-circular-progressbar/dist/styles.css"; // Import default styles

// Create socket connection outside component to prevent multiple connections
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const socket = io(BACKEND_URL);

const UserCountdown = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(60); // Default to 60 seconds
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    console.log("[Presenter] Connecting to socket server at:", BACKEND_URL);
    
    // Handle socket connection events
    socket.on('connect', () => {
      console.log('[Presenter] Socket connected with ID:', socket.id);
      setSocketConnected(true);
    });
    
    socket.on('connect_error', (error) => {
      console.error('[Presenter] Socket connection error:', error);
      setSocketConnected(false);
    });

    // Get initial countdown state
    console.log("[Presenter] Fetching initial countdown state from:", `${BACKEND_URL}/api/set-countdown/get-countdown`);
    fetch(`${BACKEND_URL}/api/set-countdown/get-countdown`)
      .then(response => response.json())
      .then(data => {
        console.log("[Presenter] Initial countdown data:", data);
        setTime(data.time);
        setIsRunning(data.isRunning);
        // Set totalTime to the initial time or keep the default if time is 0
        if (data.time > 0) {
          setTotalTime(data.time);
        }
      })
      .catch(error => console.error("[Presenter] Error fetching countdown:", error));

    // Listen for updates from the server
    socket.on("updateCountdown", (data) => {
      console.log("[Presenter] Received countdown update:", data);
      setTime(data.time);
      setIsRunning(data.isRunning);
      
      // If this is a new timer setting (not just a tick down), update totalTime
      if (data.time > 0 && (!isRunning && data.isRunning)) {
        console.log("[Presenter] Setting new total time:", data.time);
        setTotalTime(data.time);
      }
    });

    return () => {
      // Clean up event listeners
      socket.off("updateCountdown");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);
  
  // Update totalTime when time changes if totalTime is not set
  useEffect(() => {
    if (totalTime === 0 && time > 0) {
      console.log("[Presenter] Updating total time from time change:", time);
      setTotalTime(time);
    }
  }, [time, totalTime]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Calculate percentage for circular progress bar
  const percentage = totalTime > 0 ? (time / totalTime) * 100 : 0;

  // Dynamically determine the path color based on remaining time
  const getPathColor = () => {
    const timeRatio = time / totalTime;
    if (timeRatio <= 0.2) return "#FF0000"; // Red when less than or equal to 20% time left
    return "#4CAF50"; // Green otherwise
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <style>
        {`
          .CircularProgressbar-text {
            dominant-baseline: middle;
            text-anchor: middle;
            font-size: 24px;
            fill: #333; /* Text color */
          }
        `}
      </style>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Time</h1>

        {/* Circular Progress Bar */}
        <div className="mb-6 flex justify-center items-center">
          <CircularProgressbar
            value={percentage}
            text={formatTime(time)}
            styles={buildStyles({
              pathColor: getPathColor(), // Dynamically set path color
              textColor: "#333", // Dark color for text
              trailColor: "#D3D3D3", // Light gray trail
              strokeLinecap: "round", // Smooth path edges
            })}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          
        </div>

        {/* Input Fields with Set Time Button */}
        <div className="flex items-center space-x-4">

          
        </div>
      </div>
    </div>
  );
};

export default UserCountdown;
