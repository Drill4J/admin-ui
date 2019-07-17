import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { useBuildVersion } from '../../use-build-version';

import styles from './scope-info.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
  selectedScope: string;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = scopeInfo(({ className, agentId, buildVersion, selectedScope }: Props) => {
  const coverage = useBuildVersion(`/scope/${selectedScope}/coverage`, agentId, buildVersion);
  const newMethodsCoverage = useBuildVersion(
    `/scope/${selectedScope}/coverage-new`,
    agentId,
    buildVersion,
  );
  const coverageByPackages = useBuildVersion(
    `/scope/${selectedScope}/coverage-by-packages`,
    agentId,
    buildVersion,
  );

  return (
    <div className={className}>
      <Header>My first testing scope</Header>
    </div>
  );
});

const Header = scopeInfo.header('div');
