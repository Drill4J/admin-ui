export interface BuildInfo {
  deleted?: number;
  modified?: number;
  new?: number;
  total?: number;
  unaffected?: number;
  parentVersion?: string;
  [key: string]: string | number | undefined;
}
