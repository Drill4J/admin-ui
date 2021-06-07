import { isPristine } from './is-pristine';

describe('isPristine', () => {
  const initial = {
    foo: 'foo',
    bar: 'bar'
  };
  const changed = {
    foo: 'foofoo',
    bar: 'bar',
    baz: 'baz'
  }

  it('should return true when both args is equal', () => {
    expect(isPristine(initial, initial)).toBe(true);
  });

  it('should return false when both args is not equal', () => {
    expect(isPristine(initial, changed)).toBe(false);
  });
});
