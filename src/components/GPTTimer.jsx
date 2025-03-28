import React, { useState, useEffect } from "react";
import { differenceInMilliseconds } from "date-fns";

const Stopwatch = () => {
  // State to manage the start time, elapsed time, and whether the stopwatch is running
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Effect to update elapsed time while the stopwatch is running
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const now = new Date();
        setElapsedTime((prevElapsedTime) =>
          differenceInMilliseconds(now, startTime) + prevElapsedTime
        );
        setStartTime(now); // Reset start time to prevent overflow in elapsed time
      }, 10); // Update every 100ms
    }

    // Clean up the interval when the stopwatch stops
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  // Start the stopwatch
  const handleStart = () => {
    if (!isRunning) {
      setStartTime(new Date()); // Mark the current time as the start time
      setIsRunning(true); // Set stopwatch to running
    }
  };

  // Stop the stopwatch
  const handleStop = () => {
    setIsRunning(false); // Pause the stopwatch
  };

  // Reset the stopwatch
  const handleReset = () => {
    setIsRunning(false); // Stop the stopwatch
    setElapsedTime(0);   // Reset elapsed time to 0
    setStartTime(null);  // Clear start time
  };

  // Helper function to format the elapsed time to HH:mm:ss.SSS format
  const formatElapsedTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000);
    const milliseconds = timeInMs % 1000;

    // Pad with leading zeros to ensure double digits
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    const paddedMilliseconds = String(milliseconds).padStart(3, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>{formatElapsedTime(elapsedTime)}</p>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop} disabled={!isRunning}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
