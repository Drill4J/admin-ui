import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, MainProgressBar, ProgressBarLegends } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { PreviousBuildInfo } from '../previous-build-info-types';

import styles from './build-coverage-info.module.scss';

interface Props {
  className?: string;
  buildCodeCoverage: number;
  previousBuildInfo?: PreviousBuildInfo;
}

const buildCoverageInfo = BEM(styles);

export const BuildCoverageInfo = buildCoverageInfo(({
  className, buildCodeCoverage, previousBuildInfo: { previousBuildVersion = '', previousBuildCodeCoverage = 0 } = {},
}: Props) => {
  const { agentId, buildVersion, pluginId } = useParams<{agentId: string, buildVersion: string, pluginId: string }>();
  const buildDiff = percentFormatter(buildCodeCoverage) - percentFormatter(previousBuildCodeCoverage);
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
        {previousBuildVersion && (
          <span data-test="build-coverage-info:comparing">
            <b>
              {buildDiff >= 0 ? '+ ' : '- '}
              {percentFormatter(Math.abs(buildDiff))}%
              &nbsp;
            </b>
            сompared to the parent build
          </span>
        )}
      </DetailedCodeCoverageInfo>
      <MainProgressBar type="primary" value={`${buildCodeCoverage}%`} />
      <ProgressBarLegends />
    </div>
  );
});

const Title = buildCoverageInfo.title('div');
const DetailedCodeCoverageInfo = buildCoverageInfo.detailedCodeCoverageInfo('div');
const BuildCoveragePercentage = buildCoverageInfo.buildCoveragePercentage('div');
const Link = buildCoverageInfo.link(NavLink);
