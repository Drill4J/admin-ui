import { BuildInfo } from './build-info';

type NotificationType = 'BUILD';

interface Message {
  currentId?: string;
  buildInfo?: BuildInfo;
  recommendations?: string[];
}

export interface Notification {
  id?: string;
  agentId?: string;
  agentName?: string;
  createdAt?: number;
  read?: boolean;
  message?: Message;
  type?: NotificationType;
}
