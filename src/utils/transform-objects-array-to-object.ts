interface Model {
  [key: string]: any;
}
export const transformObjectsArrayToObject = (array: Model[], key: Extract<keyof Model, string>) =>
  array.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue[key]]: currentValue }), {});
