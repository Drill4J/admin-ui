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
import { path as filtersPath } from './path/fitlers.path';
import { path as newWindowPath } from './path/new-window.path';
import { path as checkboxPath } from './path/checkbox.path';
import { path as gridLayoutPath } from './path/grid-layout.path';
import { path as listLayoutPath } from './path/list-layout.path';
import { path as deletePath } from './path/delete.path';
import { path as addPath } from './path/add.path';
import { path as closePath } from './path/close.path';
import { path as coveragePath } from './path/coverage.path';
import { path as expanderPath } from './path/expander.path';
import { path as classPath } from './path/class.path';
import { path as functionPath } from './path/function.path';
import { path as packagePath } from './path/package.path';
import { declareIcon } from './declare-icon';

export const Icons = {
  Arrow: declareIcon(arrowPath),
  Account: declareIcon(accountPath, { defaultWidth: 20, defaultHeight: 20 }),
  Lock: declareIcon(lockPath, { defaultWidth: 15, defaultHeight: 20 }),
  Warning: declareIcon(warningPath),
  Agents: declareIcon(agentsPath, { defaultWidth: 24, defaultHeight: 24 }),
  Notification: declareIcon(notificationPath, { defaultWidth: 18, defaultHeight: 20 }),
  Plugins: declareIcon(pluginsPath, { defaultWidth: 24, defaultHeight: 24 }),
  Logs: declareIcon(logsPath, { defaultWidth: 26, defaultHeight: 24 }),
  Settings: declareIcon(settingsPath, { defaultWidth: 24, defaultHeight: 24 }),
  Search: declareIcon(searchPath, { defaultWidth: 16, defaultHeight: 16 }),
  Filters: declareIcon(filtersPath, { defaultWidth: 18, defaultHeight: 19 }),
  NewWindow: declareIcon(newWindowPath),
  Checkbox: declareIcon(checkboxPath, { defaultWidth: 20, defaultHeight: 20 }),
  GridLayout: declareIcon(gridLayoutPath, { defaultWidth: 16, defaultHeight: 16 }),
  ListLayout: declareIcon(listLayoutPath, { defaultWidth: 16, defaultHeight: 14 }),
  Delete: declareIcon(deletePath, { defaultWidth: 16, defaultHeight: 18 }),
  Add: declareIcon(addPath),
  Close: declareIcon(closePath),
  Coverage: declareIcon(coveragePath, { defaultWidth: 32, defaultHeight: 34 }),
  Expander: declareIcon(expanderPath, { defaultWidth: 8, defaultHeight: 13 }),
  Class: declareIcon(classPath, { defaultWidth: 12, defaultHeight: 16 }),
  Function: declareIcon(functionPath),
  Package: declareIcon(packagePath, { defaultWidth: 14, defaultHeight: 16 }),
};
