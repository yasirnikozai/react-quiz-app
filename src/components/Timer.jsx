import React, { useEffect, useState } from "react";

export default function Timer({ dispatch }) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    if (timeLeft === 0) {
      dispatch({ type: "finish" }); // Time's up, finish quiz
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup
  }, [timeLeft, dispatch]);

  const formatTime = () => {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const sec = String(timeLeft % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return <div className="timer">{formatTime()}</div>;
}
