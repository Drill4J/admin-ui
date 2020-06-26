import { timeFormatter } from './time-formatter';	

describe('timeFormatter', () => {	
  it('Should return an empty string if the number does not fall within the interval from 0 to MAX_TIMESTAMP', () => {	
    expect(timeFormatter(8640000000000000 + 1000)).toBe('');	
    expect(timeFormatter(-123230)).toBe('');
  })

  it('Should return an empty string if not a number provided', () => {	
    expect(timeFormatter(undefined)).toBe('');	
    expect(timeFormatter(NaN)).toBe('');	
    expect(timeFormatter(Infinity)).toBe('');
  });	
});
