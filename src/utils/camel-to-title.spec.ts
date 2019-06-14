import { camelToTitle } from './camel-to-title';

describe('camelToTitle', () => {
  it('should transform provided camelCase string to title', () => {
    expect(camelToTitle('fooBarBuzz')).toBe('Foo Bar Buzz');
    expect(camelToTitle('foo')).toBe('Foo');
  });

  it('should trim string after transormation', () => {
    expect(camelToTitle('fooBarBuzz   ')).toBe('Foo Bar Buzz');
    expect(camelToTitle('foo ')).toBe('Foo');
  });

  it('should return empty string if empty string privoded', () => {
    expect(camelToTitle('')).toBe('');
  });

  it('should return empty string if empty string privoded', () => {
    expect(camelToTitle('')).toBe('');
  });
});
