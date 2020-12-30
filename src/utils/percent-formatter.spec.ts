import { percentFormatter } from './percent-formatter';

describe('percentFormatter', () => {
  it('should return a rounded value with the maximum number after the decimal point equal to 1', () => {
    expect(percentFormatter(25.25134)).toEqual(25.3);
  });

  it('should return rounded to a negative number if the value is negative number after the decimal point equal to 1', () => {
    expect(percentFormatter(-213.20)).toEqual(0.1);
  });

  it('should round to an integer number if the value is number with decimals and decimal part equal to 0', () => {
    expect(percentFormatter(213.0)).toEqual(213);
  });

  it('should return 0 if the value is 0', () => {
    expect(percentFormatter(0)).toEqual(0);
  });

  it('should return 0 if the value is -0 ', () => {
    expect(percentFormatter(-0)).toEqual(0);
  });

  it('should return NaN if the value is MAX_SAFE_INTEGER', () => {
    expect(percentFormatter(Number.MAX_SAFE_INTEGER)).toEqual(NaN);
  });

  it('should return NaN if the value > MAX_SAFE_INTEGER', () => {
    expect(percentFormatter(Number.MAX_SAFE_INTEGER + 1)).toEqual(NaN);
  });

  it('should return NaN if the value > 999.95', () => {
    expect(percentFormatter(999.95)).toEqual(NaN);
  });

  it('should return 0 if the value is NaN', () => {
    expect(percentFormatter(NaN)).toEqual(0);
  });

  it('should return 0 if the value is Infinity', () => {
    expect(percentFormatter(Infinity)).toEqual(0);
  });

  it('should return 0,1 if the number you are rounding is in the range (0;0.1)', () => {
    expect(percentFormatter(0.09)).toEqual(0.1);
  });
});
