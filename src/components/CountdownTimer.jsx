import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CountdownTimer = ({ isActive, callerComponent }) => {
  const [seconds, setSeconds] = useState(300); // 5분 = 300초

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (isActive) {
      setSeconds(300); // 타이머 재시작 시 5분으로 리셋
    }
  }, [isActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return callerComponent === "SignUp" ? (
    <Button variant="outline" type="button" className="ml-2 w-1/3">
      {formatTime(seconds)}
    </Button>
  ) : (
    <div>{formatTime(seconds)}</div>
  );
};

export default CountdownTimer;
