import { SystemSettings } from './system-settings';

export interface ServiceGroup {
  id?: string;
  name?: string;
  environment?: string;
  description?: string;
  systemSettings?: SystemSettings;
}
