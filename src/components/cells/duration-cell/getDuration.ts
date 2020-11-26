export const getDuration = (value: number): { hours: string, minutes: string, seconds: string, isLessThenOneSecond: boolean } => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return {
      hours: '00', minutes: '00', seconds: '00', isLessThenOneSecond: false,
    };
  }
  const seconds = (`0${Math.floor(value / 1000) % 60}`).slice(-2);
  const minutes = (`0${Math.floor(value / 60000) % 60}`).slice(-2);
  const hours = (`0${Math.floor(value / 3600000)}`).slice(-2);
  const isLessThenOneSecond = value > 0 && seconds === '00' && minutes === '00' && hours === '00';

  return {
    hours, minutes, seconds, isLessThenOneSecond,
  };
};
