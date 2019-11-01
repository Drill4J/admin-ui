import { dateFormatter } from './date-formatter';

describe('dateFormatter', () => {
  it('Should return an empty string if the number does not fall within the interval from 0 to MAX_TIMESTAMP', () => {
    expect(dateFormatter(8640000000000000 + 1000)).toBe('');
    expect(dateFormatter(-123230)).toBe('');
  });

  it('Should return an empty string if not a number provided', () => {
    expect(dateFormatter(undefined)).toBe('');
    expect(dateFormatter(NaN)).toBe('');
    expect(dateFormatter(Infinity)).toBe('');
  });
});
