export const parseCoverage = (value: string) => {
  if (typeof value !== 'string') {
    return '';
  }
  return (value.indexOf('.') === 1 ? value.slice(0, 3) : value.slice(0, 4));
};
