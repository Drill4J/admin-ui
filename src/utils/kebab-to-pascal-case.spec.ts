import { kebabToPascalCase } from './kebab-to-pascal-case';

describe('kebabToPascalCase', () => {
  it('should transform provided kebabCase to PascalCase', () => {
    expect(kebabToPascalCase('foo-bar')).toBe('FooBar');
  })

  it('should return a same and trim string if the value is not a kebabCase', () => {
    expect(kebabToPascalCase('foo')).toBe('foo');
    expect(kebabToPascalCase(' foo')).toBe('foo');
    expect(kebabToPascalCase('foo ')).toBe('foo');
  })

  it('should return trimmed string after transformation', () => {
    expect(kebabToPascalCase('foo ')).toBe('foo');
    expect(kebabToPascalCase(' foo')).toBe('foo');
    expect(kebabToPascalCase('foo-bar ')).toBe('FooBar');
    expect(kebabToPascalCase(' foo-bar')).toBe('FooBar');
  })

  it('should return empty string if value is empty string', () => {
    expect(kebabToPascalCase('')).toBe('');
  })
})
