export const calculateTimeFromMs = (
  timeDiffMs: number,
): {
  hours: string;
  minutes: string;
  hoursNumber: number;
  minutesNumber: number;
} => {
  const hours = Math.floor(timeDiffMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours: hours.toString(),
    minutes: minutes.toString().padStart(2, "0"),
    hoursNumber: hours,
    minutesNumber: minutes,
  };
};

export const formatTimeRemaining = (timeDiffMs: number): string => {
  const { hours, minutes, hoursNumber } = calculateTimeFromMs(timeDiffMs);

  if (hoursNumber === 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
};

export const formatTimeLeft = (timeDiffMs: number): string => {
  const { hours, minutes } = calculateTimeFromMs(timeDiffMs);
  return `${hours}h ${minutes}m left`;
};

export const formatTimeExceeded = (timeDiffMs: number): string => {
  const { hours, minutes } = calculateTimeFromMs(timeDiffMs);
  return `Time exceeded ${hours}h ${minutes}m`;
};
