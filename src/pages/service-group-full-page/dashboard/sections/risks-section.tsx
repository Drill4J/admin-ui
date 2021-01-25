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
import { Panel, Icons, Tooltip } from '@drill4j/ui-kit';

import { RISKS_TYPES_COLOR } from 'common/constants';
import { RisksSummary } from 'types/risks-summary';
import { SingleBar, DashboardSection, SectionTooltip } from 'components';
import { convertToPercentage } from 'utils';

interface Props {
  risks?: RisksSummary;
}

export const RisksSection = ({ risks: { modified: modifiedMethodsCount = 0, new: newMethodsCount = 0, total = 0 } = {} }: Props) => {
  const tooltipData = {
    new: {
      count: newMethodsCount,
      color: RISKS_TYPES_COLOR.NEW,
    },
    modified: {
      count: modifiedMethodsCount,
      color: RISKS_TYPES_COLOR.MODIFIED,
    },
  };

  return (
    <DashboardSection
      label="Risks"
      info={total}
      graph={(
        <Tooltip message={<SectionTooltip data={tooltipData} hideValue />}>
          <div className="d-flex align-items-center w-100">
            <SingleBar
              width={64}
              height={128}
              color={RISKS_TYPES_COLOR.NEW}
              percent={convertToPercentage(newMethodsCount, total)}
              icon={<Icons.Add height={16} width={16} />}
            />
            <SingleBar
              width={64}
              height={128}
              color={RISKS_TYPES_COLOR.MODIFIED}
              percent={convertToPercentage(modifiedMethodsCount, total)}
              icon={<Icons.Edit height={16} width={16} viewBox="0 0 16 16" />}
            />
          </div>
        </Tooltip>
      )}
    />
  );
};
