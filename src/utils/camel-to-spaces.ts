export const camelToSpaces = (srt: string) => srt.replace(/([A-Z])/g, (match) => ` ${match.toLowerCase()}`).trim();
