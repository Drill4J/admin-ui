import assignWith from 'lodash.assignwith';

import { MethodsInfo } from '../../../../types/methods-info';

function iterator(objValue?: any, srcValue?: any) {
  if (!objValue) {
    return srcValue;
  }
  return typeof objValue === 'number'
    ? Number(objValue) + Number(srcValue)
    : [...objValue, ...srcValue];
}

export function combineModifiedMethods(...sources: MethodsInfo[]) {
  return assignWith<MethodsInfo>({}, ...sources, iterator);
}
