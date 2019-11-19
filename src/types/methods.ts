import { MethodsInfo } from './methods-info';

export interface Methods {
  totalMethods?: MethodsInfo;
  newMethods?: MethodsInfo;
  allModifiedMethods?: MethodsInfo;
  modifiedNameMethods?: MethodsInfo;
  modifiedDescMethods?: MethodsInfo;
  modifiedBodyMethods?: MethodsInfo;
  unaffectedMethods?: MethodsInfo;
  deletedMethods?: MethodsInfo;
  deletedCoveredMethodsCount?: number;
}
