import { capitalize } from "./capitalize";

describe('capitalize', () => {
  it('should transform provided uppercase string to capitalize', () => {
    expect(capitalize('FOO')).toBe('Foo');
  });

  it('should transform provided lowercase string to capitalize', () => {
    expect(capitalize('foo')).toBe('Foo');
  });

  it('should return empty string if provide value is empty string', () => {
    expect(capitalize('')).toBe('');
  });
})
