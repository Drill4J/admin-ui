import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../layouts';
import { percentFormatter } from '../../../../../utils';
import { useBuildVersion } from '../../../coverage-plugin/use-build-version';
import { SingleBar } from '../../single-bar';
import { Section } from '../section';
import { Coverage } from '../../../../../types/coverage';
import { Icons, Tooltip } from '../../../../../components';
import { Methods } from '../../../../../types/methods';

import styles from './coverage-section.module.scss';
import { SectionTooltip } from '../section-tooltip';

const coverageSection = BEM(styles);

export const CoverageSection = coverageSection(({ className }) => {
  const {
    coverage = 0,
    diff = 0,
    previousBuildInfo: { first = '', second = '' } = {},
    arrow = '',
  } = useBuildVersion<Coverage>(`/build/coverage`) || {};
  const {
    newMethods: {
      totalCount: newMethodsTotalCount = 0,
      coveredCount: newMethodsCoveredCount = 0,
    } = {},
    allModifiedMethods: {
      totalCount: modifiedMethodsTotalCount = 0,
      coveredCount: modifiedMethodsCoveredCount = 0,
    } = {},
    unaffectedMethods: {
      totalCount: unaffectedTotalCount = 0,
      coveredCount: unaffectedCoveredCount = 0,
    } = {},
  } = useBuildVersion<Methods>(`/build/methods`) || {};

  return (
    <div className={className}>
      <Section
        label="Build Coverage"
        info={
          <>
            {`${percentFormatter(coverage)}%`}
            {arrow && (
              <CoverageArrow
                rotate={arrow === 'INCREASE' ? 180 : 0}
                type={arrow}
                height={34}
                width={24}
              />
            )}
          </>
        }
        graph={
          <Tooltip
            message={
              <SectionTooltip
                data={{
                  new: {
                    count: newMethodsTotalCount,
                    value: (newMethodsCoveredCount / newMethodsTotalCount) * 100,
                    color: '#FA6400',
                  },
                  modified: {
                    count: modifiedMethodsTotalCount,
                    value: (modifiedMethodsCoveredCount / modifiedMethodsTotalCount) * 100,
                    color: '#F7B500',
                  },
                  unaffected: {
                    count: unaffectedTotalCount,
                    value: (unaffectedCoveredCount / unaffectedTotalCount) * 100,
                    color: '#6DD400',
                  },
                }}
              />
            }
          >
            <Panel>
              <SingleBar
                width={32}
                height={128}
                color="#FA6400"
                percent={(newMethodsCoveredCount / newMethodsTotalCount) * 100}
                icon={<Icons.Add />}
              />
              <SingleBar
                width={32}
                height={128}
                color="#F7B500"
                percent={(modifiedMethodsCoveredCount / modifiedMethodsTotalCount) * 100}
                icon={<Icons.Edit height={16} width={16} viewBox="0 0 16 15" />}
              />
              <SingleBar
                width={32}
                height={128}
                color="#6DD400"
                percent={(unaffectedCoveredCount / unaffectedTotalCount) * 100}
                icon={<Icons.Check />}
              />
            </Panel>
          </Tooltip>
        }
        additionalInfo={
          <Panel>
            {Boolean(diff) &&
              first &&
              `${diff > 0 ? '+' : '-'}${percentFormatter(Math.abs(diff))}% vs Build: ${second ||
                first}`}
            {!Boolean(coverage) && !first && 'Will change when at least 1 scope is done.'}
          </Panel>
        }
      />
    </div>
  );
});

const CoverageArrow: React.FC<{
  rotate: number;
  type: 'INCREASE' | 'DECREASE';
  height: number;
  width: number;
}> = coverageSection.coverageArrow(Icons.CoverageArrow);
