export function formatMsToDate(duration: number) {
  const days = Math.floor(duration / 86400000);
  const hours = Math.floor((duration - days * 86400000) / 3600000);
  const minutes = Math.floor((duration - days * 86400000 - hours * 3600000) / 60000);
  const seconds = Math.floor(
    (duration - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000,
  );

  return {
    days, hours, minutes, seconds,
  };
}
