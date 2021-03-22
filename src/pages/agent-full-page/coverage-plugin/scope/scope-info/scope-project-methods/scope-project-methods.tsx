/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useState } from 'react';
import { LinkButton } from '@drill4j/ui-kit';
import 'twin.macro';

import { BuildMethodsCard } from 'components';
import { Methods } from 'types/methods';
import { ActiveScope } from 'types/active-scope';
import { AgentStatus } from 'types/agent-status';
import { useBuildVersion } from 'hooks';
import { RisksModal } from '../../../risks-modal';
import { PreviousBuildInfo } from './previous-build-info-types';
import { ScopeCoverageInfo } from '../scope-coverage-info';

interface Props {
  scope: ActiveScope | null;
  previousBuildInfo?: PreviousBuildInfo;
  loading?: boolean;
  status?: AgentStatus;
}

export const ScopeProjectMethods = ({ scope }: Props) => {
  const {
    all, new: newMethods, modified, risks,
  } = useBuildVersion<Methods>(`/build/scopes/${scope?.id}/methods`) || {};
  const [risksFilter, setRisksFilter] = useState('');

  return (
    <div tw="flex flex-col gap-10">
      <ScopeCoverageInfo scope={scope} />
      <div tw="flex gap-2">
        <BuildMethodsCard
          totalCount={all?.total}
          covered={all?.covered}
          label="TOTAL METHODS"
        />
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
      </div>
      {risksFilter && (
        <RisksModal
          isOpen={Boolean(risksFilter)}
          onToggle={() => setRisksFilter('')}
          filter={risksFilter}
        />
      )}
    </div>
  );
};
