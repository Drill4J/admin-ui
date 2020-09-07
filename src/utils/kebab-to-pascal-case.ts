import { capitalize } from './capitalize';

export function kebabToPascalCase(str?: string): string {
  if (str === null || str === undefined || str === '') {
    return '';
  }
  if (typeof str !== 'string') {
    return kebabToPascalCase(String(str));
  }
  if (str.indexOf('-') === -1) {
    // Not a kebab-case
    return clean(str);
  }
  const arr = (str.match(/[^-]+/g) || []).map(clean);
  return arr.map(capitalize).join('');
}

function clean(str: string): string {
  return str.replace(/^\W+/, '').replace(/\W+$/, '');
}
