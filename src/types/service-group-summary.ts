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
    arrow?: 'INCREASE' | 'DECREASE';
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
    arrow?: 'INCREASE' | 'DECREASE';
    testsToRun?: { groupedTets?: { [testType: string]: string[] }; count?: number};
  };
}
