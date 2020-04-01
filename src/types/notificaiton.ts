type NotificationType = 'BUILD';

interface Message {
  currentId?: string;
  prevId?: string;
  buildDiff?: { [methodType: string]: number };
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
