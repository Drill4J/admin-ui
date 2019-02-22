import { path as arrowPath } from './path/arrow.path';
import { path as accountPath } from './path/account.path';
import { path as lockPath } from './path/lock.path';
import { path as warningPath } from './path/warning.path';
import { path as agentsPath } from './path/agents.path';
import { path as notificationPath } from './path/notification.path';
import { path as pluginsPath } from './path/plugins.path';
import { path as logsPath } from './path/logs.path';
import { path as settingsPath } from './path/settings.path';
import { path as searchPath } from './path/search.path';
import { declareIcon } from './declare-icon';

export const Icons = {
  Arrow: declareIcon(arrowPath),
  Account: declareIcon(accountPath, { defaultWidth: 20, defaultHeight: 20 }),
  Lock: declareIcon(lockPath, { defaultWidth: 15, defaultHeight: 20 }),
  Warning: declareIcon(warningPath, { defaultWidth: 16, defaultHeight: 16 }),
  Agents: declareIcon(agentsPath, { defaultWidth: 24, defaultHeight: 24 }),
  Notification: declareIcon(notificationPath, { defaultWidth: 18, defaultHeight: 20 }),
  Plugins: declareIcon(pluginsPath, { defaultWidth: 24, defaultHeight: 24 }),
  Logs: declareIcon(logsPath, { defaultWidth: 26, defaultHeight: 24 }),
  Settings: declareIcon(settingsPath, { defaultWidth: 24, defaultHeight: 24 }),
  Search: declareIcon(searchPath, { defaultWidth: 16, defaultHeight: 16 }),
};
