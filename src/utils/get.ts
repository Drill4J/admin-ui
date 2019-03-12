export function get<T>(obj?: any, path?: string): T | void | null {
  if (!path || !path.length) {
    return obj;
  }
  const [head, ...tail] = path.split('.');
  return get(obj && obj[head], tail.join('.'));
}
