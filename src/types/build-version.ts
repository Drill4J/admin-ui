import { BuildInfo } from './build-info';

export interface BuildVersion {
  buildVersion: string;
  summary: BuildInfo;
  detectedAt: number;
  [key: string]: string | number | BuildInfo;
}
