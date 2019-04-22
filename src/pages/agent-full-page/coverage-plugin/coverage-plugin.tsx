import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../layouts';
import { Icons, PageHeader, Dropdown } from '../../../components';
import { Card } from './card';
import { useWsConnection } from '../../../hooks';
import { defaultPluginSocket, defaultAdminSocket } from '../../../common/connection';
import { CoverageDetails } from './coverage-details';
import { Coverage } from '../../../types/coverage';
import { NewMethodsCoverage } from '../../../types/new-methods-coverage';
import { AgentBuildVersion } from '../../../types/agent-build-version';
import { percentFormatter } from '../../../utils';

import styles from './coverage-plugin.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
  agentBuildVersion?: string;
}

const coveragePlugin = BEM(styles);

export const CoveragePlugin = withRouter(
  coveragePlugin(({ className, match: { params: { agentId } }, agentBuildVersion = '' }: Props) => {
    const [selectedBuildVersion, setSelectedBuildVersion] = React.useState({
      value: agentBuildVersion,
      label: `Build ${agentBuildVersion}`,
    });
    const coverage =
      useWsConnection<Coverage>(defaultPluginSocket, '/coverage', {
        agentId,
        buildVersion: selectedBuildVersion.value ? selectedBuildVersion : undefined,
      }) || {};
    const newMethodsCoverage =
      useWsConnection<NewMethodsCoverage>(defaultPluginSocket, '/coverage-new', {
        agentId,
        buildVersion: selectedBuildVersion.value ? selectedBuildVersion : undefined,
      }) || {};
    const agentBuildVersions =
      useWsConnection<AgentBuildVersion[]>(defaultAdminSocket, `/agent/${agentId}/get-builds`) ||
      [];

    React.useEffect(() => {
      setSelectedBuildVersion({
        value: agentBuildVersion,
        label: `Build ${agentBuildVersion}`,
      });
    }, [agentBuildVersion]);

    return (
      <div className={className}>
        <PageHeader
          title={<span>Code Coverage Tracker</span>}
          actions={
            <Panel align="end">
              <SettingsButton>
                <Icons.Settings />
              </SettingsButton>
            </Panel>
          }
        />
        <Content>
          <Title>
            Summary
            <BuildVersion
              value={selectedBuildVersion}
              items={agentBuildVersions.map(({ version = '' }) => ({
                value: version,
                label: `Build ${version}`,
              }))}
              onChange={setSelectedBuildVersion}
            />
          </Title>
          <SummaryWrapper>
            <Card
              title="Code Coverage"
              text={
                coverage.coverage !== undefined ? `${percentFormatter(coverage.coverage)}%` : 'n/a'
              }
              secondaryText={
                coverage.uncoveredMethodsCount !== undefined ? (
                  <>
                    {coverage.uncoveredMethodsCount === 0 ? <SuccessIcon /> : <WarningIcon />}
                    {` ${coverage.uncoveredMethodsCount} methods not covered`}
                  </>
                ) : null
              }
            />
            <Card
              title="Methods, Total"
              text={coverage.methodsCount !== undefined ? coverage.methodsCount : 'n/a'}
              secondaryText={
                newMethodsCoverage.methodsCount !== undefined ? (
                  <>
                    {newMethodsCoverage.methodsCount === 0 ? <SuccessIcon /> : <WarningIcon />}
                    {` ${newMethodsCoverage.methodsCount} new methods ${
                      newMethodsCoverage.methodsCovered
                        ? `(${newMethodsCoverage.methodsCovered} covered)`
                        : ''
                    }`}
                  </>
                ) : null
              }
            />
          </SummaryWrapper>
          <CoverageDetails buildVersion={selectedBuildVersion.value} />
        </Content>
      </div>
    );
  }),
);

const SettingsButton = coveragePlugin.settingsButton('div');
const Content = coveragePlugin.content('div');
const Title = coveragePlugin.title('div');
const BuildVersion = coveragePlugin.buildVersion(Dropdown);
const SummaryWrapper = coveragePlugin.summaryWrapper('div');
const WarningIcon = coveragePlugin.warningIcon(Icons.Warning);
const SuccessIcon = coveragePlugin.successIcon(Icons.Checkbox);
