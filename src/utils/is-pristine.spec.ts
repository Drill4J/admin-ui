import { isPristine } from './is-pristine';

describe('isPristine', () => {
  const initial = {
    foo: 'foo',
    bar: 'bar',
    baz: {
      foo: 'foo'
    }
  };
  const changed = {
    foo: 'foofoo',
    bar: 'bar',
    baz: {
      foo: 'foo'
    }
  }

  it('should return true when both args is equal', () => {
    expect(isPristine(initial, initial)).toBe(true);
  });

  it('should return false when both args is not equal', () => {
    expect(isPristine(initial, changed)).toBe(false);
  });
});
