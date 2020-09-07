export const transformObjectsArrayToObject = <T, K extends keyof T>(array: T[], key: K) =>
  array.reduce((acc, value) => ({ ...acc, [value[key] as any]: value }), {} as { [key: string]: T});
