type NotificationStatus = 'UNREAD' | 'READ';

type NotificationType = 'BUILD';

export interface Notification {
  agentId?: string;
  agentName?: string;
  date?: number;
  id?: string;
  message?: string;
  status?: NotificationStatus;
  type?: NotificationType;
}
