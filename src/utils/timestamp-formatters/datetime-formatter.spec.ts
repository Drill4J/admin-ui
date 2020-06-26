import { dateTimeFormatter } from './datetime-formatter';	

describe('dateTimeFormatter', () => {	
  it('Should return an empty string if the number does not fall within the interval from 0 to MAX_TIMESTAMP', () => {	
    expect(dateTimeFormatter(8640000000000000 + 1000)).toBe('');	
    expect(dateTimeFormatter(-123230)).toBe('');
  })

  it('Should return an empty string if not a number provided', () => {	
    expect(dateTimeFormatter(undefined)).toBe('');	
    expect(dateTimeFormatter(NaN)).toBe('');	
    expect(dateTimeFormatter(Infinity)).toBe('');
  });	
});
