import { Agent } from './agent';
import { ServiceGroup } from './service-group';

export interface ServiceGroupAgents extends ServiceGroup {
  agents: Agent[]
}
