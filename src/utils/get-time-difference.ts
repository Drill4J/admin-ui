export function getTimeDifference(started: number, finished?: number) {
  const duration = finished ? finished - started : Date.now() - started;

  const days = Math.floor(duration / 86400000);
  const hours = Math.floor((duration - days * 86400000) / 3600000);
  const minutes = Math.floor((duration - days * 86400000 - hours * 3600000) / 60000);

  return `${days}d ${hours}h ${minutes}m`;
}
