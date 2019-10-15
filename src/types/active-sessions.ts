type TestTypes = 'AUTO' | 'MANUAL' | 'PERFORMANCE';

export interface ActiveSessions {
  count?: number;
  testTypes?: TestTypes[];
}
