import React, { useEffect, useState } from "react";

const TimerTwo = () => {
  const [countdown, setCountdown] = useState({ time: 0, isRunning: false });

  useEffect(() => {
    const eventSource = new EventSource("/getCountdown");

    eventSource.onmessage = (event) => {
      const updatedCountdown = JSON.parse(event.data);
      setCountdown(updatedCountdown); // Update the state
    };

    eventSource.onerror = (error) => {
      console.error("Error with SSE connection:", error);
      eventSource.close(); // Cleanup on error
    };

    // Cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Countdown</h1>
      <p>Time Remaining: {countdown.time} seconds</p>
      <p>Is Running: {countdown.isRunning ? "Yes" : "No"}</p>
    </div>
  );
};

export default TimerTwo;
