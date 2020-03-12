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
import { path as testPath } from './path/test.path';
import { path as projectTreePath } from './path/project-tree.path';
import { path as openLivePath } from './path/open-live.path';
import { path as checkPath } from './path/check.path';
import { path as registerPath } from './path/register.path';
import { path as copyPath } from './path/copy.path';
import { path as dashboardPath } from './path/dashboard.path';
import { path as scopePath } from './path/scope.path';
import { path as eyeCrossedPath } from './path/eye-crossed.path';
import { path as starPath } from './path/star.path';
import { path as coverageArrowPath } from './path/coverage-arrow.path';
import { path as moreOptionsPath } from './path/more-options.path';
import { path as editPath } from './path/edit.path';
import { path as eyePath } from './path/eye.path';
import { path as clockPath } from './path/clock.path';
import { path as totalPath } from './path/total.path';
import { path as manageSessionsPath } from './path/manage-sessions.path';
import { path as startPath } from './path/start.path';
import { path as infoPath } from './path/info.path';
import { path as testToCodePath } from './path/test-to-code.path';
import { path as lockedPath } from './path/locked.path';
import { path as unlockedPath } from './path/unlocked.path';
import { path as unregisterPath } from './path/unregister.path';
import { path as moreOptionsWithBorderPath } from './path/more-options-with-border.path';
import { path as agentPath } from './path/agent.path';
import { path as serviceGroupPath } from './path/service-group.path';
import { path as buildListPath } from './path/build-list.path';
import { path as sortingArrowPath } from './path/sorting-arrow.path';
import { declareIcon } from './declare-icon';
import { ReactComponent as SettingsSvg } from './settings.svg';

export const Icons = {
  Arrow: declareIcon(arrowPath),
  Account: declareIcon(accountPath, { defaultWidth: 20, defaultHeight: 20 }),
  Lock: declareIcon(lockPath, { defaultWidth: 15, defaultHeight: 20 }),
  Warning: declareIcon(warningPath),
  Agents: declareIcon(agentsPath, { defaultWidth: 32, defaultHeight: 32 }),
  Notification: declareIcon(notificationPath, { defaultWidth: 18, defaultHeight: 20 }),
  Settings: declareIcon(settingsPath, { defaultWidth: 24, defaultHeight: 24 }),
  Plugins: declareIcon(pluginsPath, { defaultWidth: 32, defaultHeight: 32 }),
  Logs: declareIcon(logsPath, { defaultWidth: 28, defaultHeight: 30 }),
  Search: declareIcon(searchPath, { defaultWidth: 16, defaultHeight: 16 }),
  Filters: declareIcon(filtersPath, { defaultWidth: 18, defaultHeight: 19 }),
  NewWindow: declareIcon(newWindowPath),
  Checkbox: declareIcon(checkboxPath, { defaultWidth: 20, defaultHeight: 20 }),
  GridLayout: declareIcon(gridLayoutPath, { defaultWidth: 16, defaultHeight: 16 }),
  ListLayout: declareIcon(listLayoutPath, { defaultWidth: 16, defaultHeight: 14 }),
  Delete: declareIcon(deletePath, { defaultWidth: 16, defaultHeight: 16 }),
  Add: declareIcon(addPath),
  Close: declareIcon(closePath),
  Coverage: declareIcon(coveragePath, { defaultWidth: 32, defaultHeight: 34 }),
  Expander: declareIcon(expanderPath, { defaultWidth: 8, defaultHeight: 13 }),
  Class: declareIcon(classPath, { defaultWidth: 12, defaultHeight: 16 }),
  Function: declareIcon(functionPath),
  Package: declareIcon(packagePath, { defaultWidth: 14, defaultHeight: 16 }),
  Test: declareIcon(testPath, { defaultWidth: 12, defaultHeight: 16, viewBox: '0 0 16 20' }),
  ProjectTree: declareIcon(projectTreePath, { defaultWidth: 20, defaultHeight: 20 }),
  OpenLive: declareIcon(openLivePath),
  Check: declareIcon(checkPath, { defaultWidth: 13, defaultHeight: 9 }),
  Register: declareIcon(registerPath, { defaultWidth: 18, defaultHeight: 16 }),
  Copy: declareIcon(copyPath),
  Dashboard: declareIcon(dashboardPath, { defaultWidth: 31, defaultHeight: 31 }),
  Scope: declareIcon(scopePath, { defaultWidth: 20, defaultHeight: 20 }),
  EyeCrossed: declareIcon(eyeCrossedPath, { defaultWidth: 20, defaultHeight: 20 }),
  Star: declareIcon(starPath, { defaultWidth: 21, defaultHeight: 20 }),
  CoverageArrow: declareIcon(coverageArrowPath, { defaultWidth: 22, defaultHeight: 28 }),
  MoreOptions: declareIcon(moreOptionsPath, { defaultWidth: 4, defaultHeight: 16 }),
  Edit: declareIcon(editPath, { defaultWidth: 16, defaultHeight: 18 }),
  Eye: declareIcon(eyePath, { defaultWidth: 20, defaultHeight: 12 }),
  Clock: declareIcon(clockPath),
  Total: declareIcon(totalPath, { defaultWidth: 13, defaultHeight: 16 }),
  ManageSessions: declareIcon(manageSessionsPath, { defaultWidth: 17, defaultHeight: 19 }),
  Start: declareIcon(startPath, { defaultWidth: 18, defaultHeight: 18 }),
  Info: declareIcon(infoPath, { viewBox: '0 0 20 20' }),
  Test2Code: declareIcon(testToCodePath, {
    defaultWidth: 32,
    defaultHeight: 32,
    viewBox: '0 0 32 32',
  }),
  Locked: declareIcon(lockedPath),
  Unlocked: declareIcon(unlockedPath),
  Unregister: declareIcon(unregisterPath),
  MoreOptionsWithBorder: declareIcon(moreOptionsWithBorderPath, {
    defaultWidth: 32,
    defaultHeight: 32,
    viewBox: '0 0 32 32',
  }),
  Agent: declareIcon(agentPath, { defaultWidth: 18, defaultHeight: 20 }),
  ServiceGroup: declareIcon(serviceGroupPath, { defaultWidth: 18, defaultHeight: 20 }),
  BuildList: declareIcon(buildListPath, { defaultWidth: 18, defaultHeight: 16 }),
  SortingArrow: declareIcon(sortingArrowPath, {
    defaultWidth: 7,
    defaultHeight: 10,
    viewBox: '0 0 7 10',
  }),
  NewSettings: SettingsSvg,
};
