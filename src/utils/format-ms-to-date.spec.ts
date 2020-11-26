import { formatMsToDate } from './format-ms-to-date';

describe('formatMsToDate', () => {
  it('should return an object with properties is equal to 0 if value is 1', () => {
    expect(formatMsToDate(1)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should return an object with properties is equal to 0 if value is NaN', () => {
    expect(formatMsToDate(NaN)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should return an object with properties is equal to 0 if value is Infinity', () => {
    expect(formatMsToDate(Infinity)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should return an object with properties is equal to 1 if value is 90061000', () => {
    expect(formatMsToDate(90061000)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
  });
});
