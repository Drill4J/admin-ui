import { toLowerCaseWithoutSpaces } from './to-lower-case-without-spaces';

describe('toLowerCaseWithoutSpaces', () => {
  it('should transform provided a string with large letters and spaces to a lowercase string without spaces', () => {
    expect(toLowerCaseWithoutSpaces('FOO BAR fOo BaR ')).toBe('foobarfoobar');
    expect(toLowerCaseWithoutSpaces('Foo Bar')).toBe('foobar');
    expect(toLowerCaseWithoutSpaces('   Foo Bar   ')).toBe('foobar');
  });

  it('should return empty string if empty string privoded', () => {
    expect(toLowerCaseWithoutSpaces('')).toBe('');
  });
});
