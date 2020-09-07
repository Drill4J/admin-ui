import { transformObjectsArrayToObject } from './transform-objects-array-to-object';

describe('transformObjectsArrayToObject', () => {
  const testArray = [
    {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
    {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
  ];

  it('should convert an array of objects to a single object by id', () => {
    expect(transformObjectsArrayToObject(testArray, 'id')).toStrictEqual({
      1: {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
      2: {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
    });
  });

  it('should convert an array of objects to a single object by type', () => {
    expect(transformObjectsArrayToObject(testArray, 'type')).toStrictEqual({
      foo: {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
      bar: {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
    });
  });

  it('should convert an array of objects to a single object by name', () => {
    expect(transformObjectsArrayToObject(testArray, 'name')).toStrictEqual({
      fooName: {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
      barName: {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
    });
  });
});
