export const getDuration = (value: number): { hours: string, minutes: string, seconds: string, isLessThenOneSecond: boolean } => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return {
      hours: '00', minutes: '00', seconds: '00', isLessThenOneSecond: false,
    };
  }

  const seconds = Math.round(value / 1000) % 60;
  const minutes = Math.round((value - seconds * 1000) / 60000) % 60;
  const hours = Math.round((value - minutes * 60000 - seconds * 1000) / 3600000);
  const isLessThenOneSecond = value > 0 && value < 1000;

  return {
    hours: `0${hours}`.slice(-2),
    minutes: `0${minutes}`.slice(-2),
    seconds: `0${seconds}`.slice(-2),
    isLessThenOneSecond,
  };
};
