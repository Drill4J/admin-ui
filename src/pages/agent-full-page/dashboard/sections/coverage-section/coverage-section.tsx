import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';

import { Panel } from 'layouts';
import { Icons, Tooltip } from 'components';
import { percentFormatter } from 'utils';
import { BuildCoverage } from 'types/build-coverage';
import { Methods } from 'types/methods';
import { isActiveBuild } from 'pages/agent-full-page/is-active-build';
import { useBuildVersion } from '../../../coverage-plugin/use-build-version';
import { SingleBar } from '../../single-bar';
import { Section } from '../section';
import { SectionTooltip } from '../section-tooltip';

import styles from './coverage-section.module.scss';

interface Props {
  className?: string;
  activeBuildVersion?: string;
}

const coverageSection = BEM(styles);

export const CoverageSection = coverageSection(({ className, activeBuildVersion }: Props) => {
  const {
    ratio = 0,
    diff = 0,
    prevBuildVersion = '',
    arrow = '',
  } = useBuildVersion<BuildCoverage>('/build/coverage') || {};
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
  } = useBuildVersion<Methods>('/build/methods') || {};
  const { buildVersion = '' } = useParams();

  return (
    <div className={className}>
      <Section
        label="Build Coverage"
        info={(
          <>
            {`${percentFormatter(ratio)}%`}
            {arrow && (
              <CoverageArrow
                rotate={arrow === 'INCREASE' ? 180 : 0}
                type={arrow}
                height={34}
                width={24}
              />
            )}
          </>
        )}
        graph={(
          <Tooltip
            message={(
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
            )}
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
        )}
        additionalInfo={(
          <Panel>
            {Boolean(diff)
              && prevBuildVersion
              && `${diff > 0 ? '+' : '-'}${percentFormatter(Math.abs(diff))}% vs Build: ${prevBuildVersion}`}
            {!ratio && !prevBuildVersion && isActiveBuild(activeBuildVersion, buildVersion)
              && 'Will change when at least 1 scope is done.'}
          </Panel>
        )}
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
