export const inputLengthRestriction = (str: string, maxCharacters: number): string =>
  (typeof str === 'string' ? str.substring(0, maxCharacters) : '');
