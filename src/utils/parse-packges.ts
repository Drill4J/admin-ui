export const parsePackges = (value: string) => value.replace(/(?:(?!\n)\s)/g, '').split(/\n/);
