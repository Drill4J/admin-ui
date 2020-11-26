import { getDuration } from './getDuration';

describe('getDuration', () => {
  it('should return object with the seconds, minutes, hours properties is equal 00 and isLessThenOneSecond is equal false if value is NaN', () => {
    expect(getDuration(NaN)).toEqual({
      seconds: '00',
      minutes: '00',
      hours: '00',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with the seconds, minutes, hours properties is equal 00 and isLessThenOneSecond is equal false if value is Infinity', () => {
    expect(getDuration(Infinity)).toEqual({
      seconds: '00',
      minutes: '00',
      hours: '00',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with the seconds, minutes, hours properties is equal 00 and isLessThenOneSecond is equal false if value is 0', () => {
    expect(getDuration(0)).toEqual({
      seconds: '00',
      minutes: '00',
      hours: '00',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with the seconds, minutes, hours properties is equal 01 and isLessThenOneSecond is equal false if value is 3661001', () => {
    expect(getDuration(3661001)).toEqual({
      seconds: '01',
      minutes: '01',
      hours: '01',
      isLessThenOneSecond: false
    });
  });

  it('should return object with isLessThenOneSecond property is equal true if value is 123', () => {
    expect(getDuration(123).isLessThenOneSecond).toBe(true);
  });
});
