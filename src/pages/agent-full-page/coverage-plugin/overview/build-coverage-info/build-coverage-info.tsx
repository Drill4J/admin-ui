import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Legends, MainProgressBar } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { BuildCoverage } from 'types/build-coverage';

import styles from './build-coverage-info.module.scss';

interface Props {
  className?: string;
  buildCoverage: BuildCoverage;
}

const buildCoverageInfo = BEM(styles);

export const BuildCoverageInfo = buildCoverageInfo(({ className, buildCoverage }: Props) => {
  const { prevBuildVersion = '', diff = 0, percentage: buildCodeCoverage = 0 } = buildCoverage;
  const { agentId, buildVersion, pluginId } = useParams<{agentId: string, buildVersion: string, pluginId: string }>();
  return (
    <div className={className}>
      <Panel align="space-between">
        <Title data-test="build-coverage-info:title">BUILD COVERAGE</Title>
        <Link
          to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/`}
          data-test="build-coverage-info:all-scopes-link"
        >
          All scopes
        </Link>
      </Panel>
      <DetailedCodeCoverageInfo data-test="build-coverage-info:detailed-code-coverage-info">
        <BuildCoveragePercentage data-test="build-coverage-info:build-coverage-percentage">
          {percentFormatter(buildCodeCoverage)}%
        </BuildCoveragePercentage>
        {prevBuildVersion && (
          <span data-test="build-coverage-info:comparing">
            <b>
              {diff >= 0 ? '+ ' : '- '}
              {percentFormatter(Math.abs(diff))}%
              &nbsp;
            </b>
            сomparing to Build:&nbsp;
            {prevBuildVersion}
          </span>
        )}
      </DetailedCodeCoverageInfo>
      <MainProgressBar type="primary" value={`${buildCodeCoverage}%`} />
      <Legends />
    </div>
  );
});

const Title = buildCoverageInfo.title('div');
const DetailedCodeCoverageInfo = buildCoverageInfo.detailedCodeCoverageInfo('div');
const BuildCoveragePercentage = buildCoverageInfo.buildCoveragePercentage('div');
const Link = buildCoverageInfo.link(NavLink);
