import { CommonEntity } from 'types/common-entity';
import { Agent } from './agent';

export interface ServiceGroup extends CommonEntity {
  agents?: Agent[];
}
