import { formatPackages } from './format-packages';

describe('formatPackages', () => {
  it('should transform an array into a string and display elements from a new line', () => {
    expect(formatPackages(['123', 'foobar', 'buzz'])).toBe('123\nfoobar\nbuzz');
    expect(formatPackages(['foo'])).toBe('foo');
    expect(formatPackages([''])).toBe('');
    expect(formatPackages(['', '', ''])).toBe('');
    expect(formatPackages([])).toBe('');
  });

  it('should transform an undefined into a string and display elements from a new line', () => {
    expect(formatPackages(undefined)).toBe('');
  });
});
