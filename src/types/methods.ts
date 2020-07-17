import { RisksSummary } from './risks-summary';

interface Count {
  covered: number;
  total: number;
}

export interface Methods {
  all?: Count;
  deleted?: Count;
  modified?: Count;
  new?: Count;
  unaffected?: Count;
  risks?: RisksSummary;
}
