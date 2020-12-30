export const percentFormatter = (value: number): number => {
  if (Number.isNaN(value) || value === Infinity || !value) {
    return 0;
  }

  if (value < 0.1) {
    return 0.1;
  }

  return Number(new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value));
};
