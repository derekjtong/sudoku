import { useState, useEffect, useRef } from "react";

const useTimer = (initialState = { seconds: 0, isPaused: true }) => {
  const [timer, setTimer] = useState(initialState.seconds);
  const [isPaused, setIsPaused] = useState(initialState.isPaused);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (isPaused) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  const reset = () => {
    setTimer(0);
    setIsPaused(true);
  };

  // Helper function to format the timer to hh:mm:ss
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return { timer, isPaused, pause, resume, reset, formatTime };
};

export default useTimer;
