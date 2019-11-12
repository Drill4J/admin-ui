import { MethodsInfo } from './methods-info';

export interface Methods {
  totalMethods?: MethodsInfo;
  newMethods?: MethodsInfo;
  allModified?: MethodsInfo;
  modifiedNameMethods?: MethodsInfo;
  modifiedDescMethods?: MethodsInfo;
  modifiedBodyMethods?: MethodsInfo;
  notModifiedMethods?: MethodsInfo;
  deletedMethods?: MethodsInfo;
  deletedCoveredMethodsCount?: number;
}
