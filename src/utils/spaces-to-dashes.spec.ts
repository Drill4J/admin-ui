import { spacesToDashes } from './spaces-to-dashes';

describe('spacesToDashes', () => {
  it('should trim the string before transormation', () => {
    expect(spacesToDashes('   foobarbuzz   ')).toBe('foobarbuzz');
  })

  it('should convert the string to lowercase before transormation', () => {
    expect(spacesToDashes('   FooBARbuzZ   ')).toBe('foobarbuzz');
  })

  it('should replace spaces with a dash in a provided string', () => {
    expect(spacesToDashes('foo bar buzz')).toBe('foo-bar-buzz');
  });
});
