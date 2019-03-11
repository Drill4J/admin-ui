import { get } from './get';

describe('get', () => {
  const client = {
    foo: {
      bar: {
        buzz: 'buzz',
      },
    },
  };
  it('should retrieve value by path from object', () => {
    expect(get(client, 'foo.bar.buzz')).toBe('buzz');
  });

  it('should return object if no path provided', () => {
    expect(get(client, undefined)).toBe(client);
    expect(get(client, '')).toBe(client);
  });

  it('should return undefined if value does not exist by provided path', () => {
    expect(get(client, 'foo.buzz')).toBe(undefined);
  });

  it('should return undefined if no object provided', () => {
    expect(get(undefined, 'foo.buzz')).toBe(undefined);
  });

  it('should return null if object is null', () => {
    expect(get(null, 'foo.buzz')).toBe(null);
  });
});
