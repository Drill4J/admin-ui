export const parsePackages = (value: string): string[] => value.replace(/(?:(?!\n)\s)/g, '').split(/\n/);
