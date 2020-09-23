export const percentFormatter = (value: number): number => {
  if (Number.isNaN(value) || value === Infinity || !value) {
    return 0;
  }
  return Number(new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value));
};
