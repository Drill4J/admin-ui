const MAX_TIMESTAMP = 8640000000000000;

export function dateFormatter(timestamp?: number) {
  if (typeof timestamp === 'number' && timestamp >= 0 && timestamp < MAX_TIMESTAMP) {
    const date = new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const time = new Date(timestamp).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${date} ${time}`;
  }
  return '';
}
