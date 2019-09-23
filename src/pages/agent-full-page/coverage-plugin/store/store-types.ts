import { ScopeSummary } from '../../../../types/scope-summary';

export type ModalName = 'RenameScopeModal' | 'DeleteScopeModal' | 'FinishScopeModal';

export interface PluginState {
  openedModalName?: ModalName;
  scope: ScopeSummary | null;
}
