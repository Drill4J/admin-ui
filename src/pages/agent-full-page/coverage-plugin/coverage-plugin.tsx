import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../layouts';
import { Icons, PageHeader } from '../../../components';
import { Card } from './card';
import { useWsConnection } from '../../../hooks';
import { defaultPluginSocket } from '../../../common/connection';
import { CoverageDetails } from './coverage-details';
import { Coverage } from '../../../types/coverage';
import { NewMethodsCoverage } from '../../../types/new-methods-coverage';
import { percentFormatter } from '../../../utils';

import styles from './coverage-plugin.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const coveragePlugin = BEM(styles);

export const CoveragePlugin = withRouter(
  coveragePlugin(({ className, match: { params: { agentId } } }: Props) => {
    const coverage = useWsConnection<Coverage>(defaultPluginSocket, '/coverage', { agentId }) || {};
    const newMethodsCoverage =
      useWsConnection<NewMethodsCoverage>(defaultPluginSocket, '/coverage-new', {
        agentId,
      }) || {};

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
          <Title>Summary</Title>
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
          <CoverageDetails />
        </Content>
      </div>
    );
  }),
);

const SettingsButton = coveragePlugin.settingsButton('div');
const Content = coveragePlugin.content('div');
const Title = coveragePlugin.title('div');
const SummaryWrapper = coveragePlugin.summaryWrapper('div');
const WarningIcon = coveragePlugin.warningIcon(Icons.Warning);
const SuccessIcon = coveragePlugin.successIcon(Icons.Checkbox);
