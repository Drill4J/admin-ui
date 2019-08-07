import { MethodsInfo } from './methods-info';

export interface Methods {
  totalMethods?: MethodsInfo;
  newMethods?: MethodsInfo;
  modifiedNameMethods?: MethodsInfo;
  modifiedDescMethods?: MethodsInfo;
  modifiedBodyMethods?: MethodsInfo;
  deletedMethods?: MethodsInfo;
}
