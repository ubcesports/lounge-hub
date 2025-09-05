export const calculateHoursAndMinutes = (
  timeDiff: number,
): { hours: number; minutes: number } => {
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};

export const formatTimeString = (
  hours: number,
  minutes: number,
  showHours: boolean = true,
): string => {
  const formattedMinutes = minutes.toString().padStart(2, "0");

  if (!showHours || hours === 0) {
    return `${formattedMinutes}m`;
  }

  return `${hours}h ${formattedMinutes}m`;
};

export const formatTimeFromMilliseconds = (
  timeDiff: number,
  showHours: boolean = true,
): string => {
  const { hours, minutes } = calculateHoursAndMinutes(timeDiff);
  return formatTimeString(hours, minutes, showHours);
};
