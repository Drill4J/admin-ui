import { Notification } from './notificaiton';

export interface NewBuildNotification extends Notification {
  additionalInfo?: {
    currentId?: string;
    prevId?: string;
    prevAlias?: string;
    recommendations?: string[];
    buildDiff?: { [methodType: string]: number };
  };
}
