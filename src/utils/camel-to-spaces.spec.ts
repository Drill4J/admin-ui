import { camelToSpaces } from './camel-to-spaces';

describe('camelToSpaces', () => {
  it('should transform provided camelCase string to spaces', () => {
    expect(camelToSpaces('fooBarBuzz')).toBe('foo bar buzz');
    expect(camelToSpaces('foo')).toBe('foo');
  });

  it('should trim string after transormation', () => {
    expect(camelToSpaces('fooBarBuzz   ')).toBe('foo bar buzz');
    expect(camelToSpaces('foo ')).toBe('foo');
  });

  it('should return empty string if empty string privoded', () => {
    expect(camelToSpaces('')).toBe('');
  });
});
