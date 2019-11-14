export const formatPackages = (value: string[] = []) =>
  value.reduce(
    (acc: string, item: string, index: number) =>
      index !== value.length - 1 && item !== '' ? acc + item + '\n' : acc + item,
    '',
  );
