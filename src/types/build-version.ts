export interface BuildVersion {
  buildVersion: string;
  summary: BuildSummary;
  detectedAt: number;
  [key: string]: string | number | BuildSummary;
}

interface BuildSummary {
  total?: number;
  new?: number;
  modified?: number;
  unaffected?: number;
  deleted?: number;
}
