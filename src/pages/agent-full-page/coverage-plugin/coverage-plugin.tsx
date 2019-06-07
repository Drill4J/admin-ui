import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../layouts';
import { Icons, PageHeader, TabsPanel, Tab } from '../../../components';
import { Inputs } from '../../../forms';
import { useWsConnection } from '../../../hooks';
import { defaultAdminSocket } from '../../../common/connection';
import { Card } from './card';
import { CoverageDetails } from './coverage-details';
import { TestDetails } from './test-details';
import { useBuildVersion } from './use-build-version';
import { NewMethodsModal } from './new-methods-modal';
import { CodeCoverageCard } from './code-coverage-card';
import { Coverage } from '../../../types/coverage';
import { NewMethodsCoverage } from '../../../types/new-methods-coverage';
import { AgentBuildVersion } from '../../../types/agent-build-version';

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
    const [isNewMethodsModalOpen, setIsNewMethodsModalOpen] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState('packages');
    const coverage =
      useBuildVersion<Coverage>('/coverage', agentId, selectedBuildVersion.value) || {};
    const newMethodsCoverage =
      useBuildVersion<NewMethodsCoverage>('/coverage-new', agentId, selectedBuildVersion.value) ||
      {};
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
          title={<span>Code Coverage Tracker </span>}
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
            <CodeCoverageCard
              coverage={coverage}
              agentId={agentId}
              buildVersion={selectedBuildVersion.value}
            />
            <Card
              title="Methods, Total"
              text={coverage.methodsCount !== undefined ? coverage.methodsCount : 'n/a'}
              secondaryText={
                newMethodsCoverage.methodsCount !== undefined ? (
                  <NewMethods
                    onClick={() => setIsNewMethodsModalOpen(true)}
                    disabled={!Boolean(newMethodsCoverage.methodsCount)}
                  >
                    {newMethodsCoverage.methodsCount === 0 ? <SuccessIcon /> : <WarningIcon />}
                    {` ${newMethodsCoverage.methodsCount} new methods (${
                      newMethodsCoverage.methodsCovered
                    } covered)`}
                  </NewMethods>
                ) : null
              }
            />
          </SummaryWrapper>
          <DetailsHeader align="space-between">
            Details
            <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
              <Tab name="packages">
                <TabIconWrapper>
                  <Icons.ProjectTree />
                </TabIconWrapper>
                Project tree
              </Tab>
              <Tab name="tests">
                <TabIconWrapper>
                  <Icons.Test height={20} width={18} viewBox="0 0 20 18" />
                </TabIconWrapper>
                Tests
              </Tab>
            </TabsPanel>
          </DetailsHeader>
          {selectedTab === 'packages' ? (
            <CoverageDetails buildVersion={selectedBuildVersion.value} />
          ) : (
            <TestDetails agentId={agentId} buildVersion={selectedBuildVersion.value} />
          )}
          {isNewMethodsModalOpen && (
            <NewMethodsModal
              agentId={agentId}
              buildVersion={selectedBuildVersion.value}
              isOpen={isNewMethodsModalOpen}
              onToggle={setIsNewMethodsModalOpen}
            />
          )}
        </Content>
      </div>
    );
  }),
);

const SettingsButton = coveragePlugin.settingsButton('div');
const Content = coveragePlugin.content('div');
const Title = coveragePlugin.title('div');
const BuildVersion = coveragePlugin.buildVersion(Inputs.Dropdown);
const SummaryWrapper = coveragePlugin.summaryWrapper('div');
const DetailsHeader = coveragePlugin.detailsHeader(Panel);
const TabIconWrapper = coveragePlugin.tabIconWrapper('div');
const WarningIcon = coveragePlugin.warningIcon(Icons.Warning);
const SuccessIcon = coveragePlugin.successIcon(Icons.Checkbox);
const NewMethods = coveragePlugin.newMethods(
  div({ onClick: () => {} } as { onClick: (arg: Event) => void; disabled?: boolean }),
);
