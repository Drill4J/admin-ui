export function capitalize(str?: string): string {
  if (str === null || str === undefined || str === '') {
    return '';
  }
  if (typeof str !== 'string') {
    return capitalize(String(str));
  }
  return `${str[0].toUpperCase()}${str.substr(1).toLowerCase()}`;
}
