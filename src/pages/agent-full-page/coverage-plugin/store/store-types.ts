import { ScopeSummary } from '../../../../types/scope-summary';
import { ActiveSessions } from '../../../../types/active-sessions';

export type ModalName =
  | 'RenameScopeModal'
  | 'DeleteScopeModal'
  | 'FinishScopeModal'
  | 'ManageSessionsModal';

export interface PluginState {
  openedModalName?: ModalName;
  scope: ScopeSummary | null;
  activeSessions: ActiveSessions;
}
