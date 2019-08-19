export interface MethodsDetails {
  name?: string;
  ownerClass?: string;
  desc?: string;
  coverage?: number;
  coverageRate?: 'MISSED' | 'PARTLY' | 'FULL';
}
