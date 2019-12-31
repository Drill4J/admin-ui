import { CommonEntity } from 'types/common-entity';
import { Agent } from './agent';

export interface ServiceGroup {
  group: CommonEntity;
  agents?: Agent[];
}
