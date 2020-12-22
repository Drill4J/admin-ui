import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { LinkButton } from '@drill4j/ui-kit';

import { BuildMethodsCard } from 'components';
import { Methods } from 'types/methods';
import { ActiveScope } from 'types/active-scope';
import { AgentStatus } from 'types/agent-status';
import { useBuildVersion } from 'hooks';
import { RisksModal } from '../../../risks-modal';
import { PreviousBuildInfo } from './previous-build-info-types';
import { ScopeCoverageInfo } from '../scope-coverage-info';

import styles from './scope-project-methods.module.scss';

interface Props {
  className?: string;
  scope: ActiveScope | null;
  previousBuildInfo?: PreviousBuildInfo;
  loading?: boolean;
  status?: AgentStatus;
}

const scopeProjectMethods = BEM(styles);

export const ScopeProjectMethods = scopeProjectMethods(({ className, scope }: Props) => {
  const {
    all, new: newMethods, modified, deleted, risks,
  } = useBuildVersion<Methods>(`/scope/${scope?.id}/methods`) || {};
  const [risksFilter, setRisksFilter] = React.useState('');

  return (
    <div className={className}>
      <ScopeCoverageInfo scope={scope} />
      <Cards>
        <BuildMethodsCard
          totalCount={all?.total}
          covered={all?.covered}
          label="TOTAL METHODS"
        >
          {deleted?.total} <Deleted>deleted</Deleted>
        </BuildMethodsCard>
        <BuildMethodsCard
          totalCount={newMethods?.total}
          covered={newMethods?.covered}
          label="NEW"
        >
          {Boolean(risks?.new) && (
            <LinkButton
              size="small"
              onClick={() => setRisksFilter('new')}
              data-test="project-methods-cards:link-button:new:risks"
            >
              {risks?.new} risks
            </LinkButton>
          )}
        </BuildMethodsCard>
        <BuildMethodsCard
          totalCount={modified?.total}
          covered={modified?.covered}
          label="MODIFIED"
        >
          {Boolean(risks?.modified) && (
            <LinkButton
              size="small"
              onClick={() => setRisksFilter('modified')}
              data-test="project-methods-cards:link-button:modified:risks"
            >
              {risks?.modified} risks
            </LinkButton>
          )}
        </BuildMethodsCard>
      </Cards>
      {risksFilter && (
        <RisksModal
          isOpen={Boolean(risksFilter)}
          onToggle={() => setRisksFilter('')}
          filter={risksFilter}
        />
      )}
    </div>
  );
});

const Cards = scopeProjectMethods.cards('div');
const Deleted = scopeProjectMethods.deleted('span');
