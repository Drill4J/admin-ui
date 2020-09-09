import { inputLengthRestriction } from './input-length-restriction';

describe('inputRestriction', () => {
  it('should return the cropped string', () => {
    expect(inputLengthRestriction('123456789', 7)).toEqual('1234567');
  });
});
