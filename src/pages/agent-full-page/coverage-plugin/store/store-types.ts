import { ActiveScope } from 'types/active-scope';
import { ActiveSessions } from 'types/active-sessions';

export type ModalName =
  | 'RenameScopeModal'
  | 'DeleteScopeModal'
  | 'FinishScopeModal'
  | 'SessionsManagementModal';

export interface PluginState {
  openedModalName?: ModalName;
  scope: ActiveScope | null;
  activeSessions: ActiveSessions;
}
