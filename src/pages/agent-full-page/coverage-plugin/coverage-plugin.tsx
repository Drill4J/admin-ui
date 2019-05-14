import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../layouts';
import { Icons, PageHeader, Dropdown } from '../../../components';
import { Card } from './card';
import { useWsConnection } from '../../../hooks';
import { defaultAdminSocket } from '../../../common/connection';
import { CoverageDetails } from './coverage-details';
import { Coverage } from '../../../types/coverage';
import { NewMethodsCoverage } from '../../../types/new-methods-coverage';
import { AgentBuildVersion } from '../../../types/agent-build-version';
import { useBuildVersion } from './use-build-version';
import { CodeCoverageCard } from './code-coverage-card';
import { NewMethodsModal } from './new-methods-modal';

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
            <CodeCoverageCard coverage={coverage} />
            <Card
              title="Methods, Total"
              text={coverage.methodsCount !== undefined ? coverage.methodsCount : 'n/a'}
              secondaryText={
                newMethodsCoverage.methodsCount !== undefined ? (
                  <NewMethods onClick={() => setIsNewMethodsModalOpen(true)}>
                    {newMethodsCoverage.methodsCount === 0 ? <SuccessIcon /> : <WarningIcon />}
                    {` ${newMethodsCoverage.methodsCount} new methods ${
                      newMethodsCoverage.methodsCovered
                        ? `(${newMethodsCoverage.methodsCovered} covered)`
                        : ''
                    }`}
                  </NewMethods>
                ) : null
              }
            />
          </SummaryWrapper>
          <CoverageDetails buildVersion={selectedBuildVersion.value} />
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
const BuildVersion = coveragePlugin.buildVersion(Dropdown);
const SummaryWrapper = coveragePlugin.summaryWrapper('div');
const WarningIcon = coveragePlugin.warningIcon(Icons.Warning);
const SuccessIcon = coveragePlugin.successIcon(Icons.Checkbox);
const NewMethods = coveragePlugin.newMethods('div');
