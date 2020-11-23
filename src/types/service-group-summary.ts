import { RisksSummary } from './risks-summary';
import { TestCount } from './test-count';
import { TestTypeSummary } from './test-type-summary';

export interface Summary {
  id?: string;
  name?: string;
  buildVersion?: string;
  summary?: {
    coverage?: number;
    coverageCount?: {
      covered?: number;
      total?: number;
    };
    risks?: number;
    testsToRun?: number;
  };
}

export interface ServiceGroupSummary {
  name?: string;
  summaries?: Summary[];
  aggregated?: {
    coverage?: number;
    coverageCount?: {
      covered?: number;
      total?: number;
    };
    riskCounts?: RisksSummary;
    tests: TestTypeSummary[],
    testsToRun: TestCount,
    scopeCount?: number;
    recommendations?: string[];
  };
}
