import { ScopeSummary } from '../../../../types/scope-summary';

export type ModalName = 'RenameScopeModal' | 'DeleteScopeModal' | 'FinishScopeModal';

export interface PluginState {
  agentId: string;
  pluginId: string;
  buildVersion: string;
  openedModalName?: ModalName;
  scope: ScopeSummary | null;
}
