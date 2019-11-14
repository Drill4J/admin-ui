import { parsePackges } from './parse-packges';

describe('parsePackges', () => {
  it('should transform to an array containing strings without spaces', () => {
    expect(parsePackges('foo bar   buzz   bizz  ')).toStrictEqual(['foobarbuzzbizz']);
    expect(parsePackges('                       ')).toStrictEqual(['']);
    expect(parsePackges('')).toStrictEqual(['']);
  });
});
