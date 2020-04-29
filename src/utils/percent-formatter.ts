export const percentFormatter = (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value);
