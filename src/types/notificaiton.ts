type NotificationType = 'BUILD';

export interface Notification {
  id?: string;
  agentId?: string;
  agentName?: string;
  createdAt?: number;
  read?: boolean;
  message?: string;
  type?: NotificationType;
}
