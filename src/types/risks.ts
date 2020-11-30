import { RiskType } from './risk-type';

export interface Risks {
  desc?: string;
  name?: string;
  ownerClass?: string;
  type?: RiskType;
}
