import { MethodsInfo } from './methods-info';

export interface Methods {
  totalMethods?: MethodsInfo;
  newMethods?: MethodsInfo;
  allModifiedModified?: MethodsInfo;
  modifiedNameMethods?: MethodsInfo;
  modifiedDescMethods?: MethodsInfo;
  modifiedBodyMethods?: MethodsInfo;
  unaffectedMethods?: MethodsInfo;
  deletedMethods?: MethodsInfo;
  deletedCoveredMethodsCount?: number;
}
