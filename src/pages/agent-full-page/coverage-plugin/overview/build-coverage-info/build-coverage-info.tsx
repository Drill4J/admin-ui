import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Legends } from '@drill4j/ui-kit';

import styles from './build-coverage-info.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
  multiProgressBar: React.ReactNode;
}

const buildCoverageInfo = BEM(styles);

export const BuildCoverageInfo = buildCoverageInfo(({ className, children, multiProgressBar }: Props) => (
  <div className={className}>
    <Panel align="space-between">
      <Title data-test="build-coverage-info:title">BUILD COVERAGE</Title>
      <span>
        <BuildCoverageType type="build">Build</BuildCoverageType>
        <BuildCoverageType type="overlapping">Build / Scope overlap</BuildCoverageType>
        <BuildCoverageType type="scope">Scope</BuildCoverageType>
      </span>
    </Panel>
    <BuildCoverageStatus data-test="build-coverage-info:status">
      {children}
    </BuildCoverageStatus>
    {multiProgressBar}
    <Legends />
  </div>
));

const Title = buildCoverageInfo.title('div');
const BuildCoverageStatus = buildCoverageInfo.buildCoverageStatus('div');
const BuildCoverageType = buildCoverageInfo.buildCoverageType('span');
