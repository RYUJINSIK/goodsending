import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

const CountdownTimer = ({
  remainingExpiration,
  isActive,
  callerComponent,
  startDateTime,
  endDateTime,
  triggerReset,
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateInitialTimeLeft());

  function calculateInitialTimeLeft() {
    if (remainingExpiration && typeof remainingExpiration === "string") {
      const match = remainingExpiration.match(/(\d+)M(\d+)S/);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        return { hours: 0, minutes, seconds };
      }
    }

    if (callerComponent === "SignUp") {
      return { hours: 0, minutes: 5, seconds: 0 };
    }

    // If we reach here, it means remainingExpiration was not valid or not provided
    const endTime = new Date(endDateTime).getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  }

  useEffect(() => {
    setTimeLeft(calculateInitialTimeLeft());
  }, [remainingExpiration, startDateTime, endDateTime]);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const totalSeconds =
            prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds;
          if (totalSeconds > 0) {
            return {
              hours: Math.floor((totalSeconds - 1) / 3600),
              minutes: Math.floor(((totalSeconds - 1) % 3600) / 60),
              seconds: (totalSeconds - 1) % 60,
            };
          } else {
            clearInterval(timer);
            return { hours: 0, minutes: 0, seconds: 0 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    if (triggerReset) {
      setTimeLeft({ hours: 0, minutes: 5, seconds: 0 });
    }
  }, [triggerReset, callerComponent]);

  const formatTime = (time) => {
    const { hours, minutes, seconds } = time;
    if (callerComponent === "SignUp") {
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return callerComponent === "SignUp" ? (
    <Button
      variant="outline"
      type="button"
      className="ml-2 w-1/3 cursor-default border-primary"
    >
      <Timer className="mr-2 h-4 w-4" />
      {formatTime(timeLeft)}
    </Button>
  ) : (
    <div className="flex items-center justify-center text-center font-bold text-2xl">
      <Timer className="mr-2 h-6 w-6 text-primary" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default CountdownTimer;
