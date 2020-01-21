export interface Summary {
  agentName?: string;
  agentId?: string;
  lastBuild?: { version?: string; alias?: string };
  data?: {
    coverage?: number;
    risks?: number;
    testsToRun?: number;
    arrow?: 'INCREASE' | 'DECREASE';
  };
}

export interface ServiceGroupSummary {
  name?: string;
  summaries?: Summary[];
  count?: number;
  aggregatedData?: {
    coverage?: number;
    risks?: number;
    arrow?: 'INCREASE' | 'DECREASE';
    testsToRun?: { groupedTets?: { [testType: string]: string[] }; count?: number};
  };
}
