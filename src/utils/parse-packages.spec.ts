import { parsePackages } from './parse-packages';

describe('parsePackages', () => {
  it('should transform to an array containing strings without spaces', () => {
    expect(parsePackages('foo bar   buzz   bizz  ')).toStrictEqual(['foobarbuzzbizz']);
    expect(parsePackages('                       ')).toStrictEqual(['']);
    expect(parsePackages('')).toStrictEqual(['']);
  });
});
