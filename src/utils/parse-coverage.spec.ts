import { parseCoverage } from './parse-coverage';

describe('parseCoverage', () => {
  it('should return the value without the hundredth part', () => {
    expect(parseCoverage('1.1111111111111')).toEqual('1.1');
    expect(parseCoverage('10.1111111111111')).toEqual('10.1');
    expect(parseCoverage('100')).toEqual('100');
  });
});
