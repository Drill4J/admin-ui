export function convertToPercentage(numerator: number, denominator: number): number {
  if (
    denominator === 0 ||
    Number.isNaN(numerator) ||
    Number.isNaN(denominator) ||
    !Number.isFinite(denominator) ||
    !Number.isFinite(numerator)
  ) {
    return 0;
  }
  return (numerator / denominator) * 100;
}
