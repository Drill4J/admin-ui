import { ScopeSummary } from '../../../../types/scope-summary';

export interface PluginState {
  agentId: string;
  pluginId: string;
  buildVersion: string;
  openedModalName?: 'RenameScopeModal' | 'DeleteScopeModal' | 'FinishScopeModal';
  scope: ScopeSummary | null;
}

export interface Action {
  type: string;
  payload: unknown;
}
