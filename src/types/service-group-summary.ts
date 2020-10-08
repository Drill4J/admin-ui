import { ArrowType } from 'types/arrow-type';

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
    arrow?: ArrowType;
  };
}

export interface ServiceGroupSummary {
  name?: string;
  summaries?: Summary[];
  count?: number;
  aggregated?: {
    coverage?: number;
    coverageCount?: {
      covered?: number;
      total?: number;
    };
    risks?: number;
    arrow?: ArrowType;
    testsToRun?: { groupedTets?: { [testType: string]: string[] }; count?: number};
  };
}
