import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';
import { Panel, Icons, Tooltip } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { BuildCoverage } from 'types/build-coverage';
import { Methods } from 'types/methods';
import { COVERAGE_TYPES_COLOR } from 'common/constants';
import { ParentBuild } from 'types/parent-build';
import { useBuildVersion } from '../../../coverage-plugin/use-build-version';
import { usePreviousBuildCoverage } from '../../../coverage-plugin/use-previous-build-coverage';
import { SingleBar } from '../../single-bar';
import { Section } from '../section';
import { SectionTooltip } from '../section-tooltip';

import styles from './coverage-section.module.scss';

interface Props {
  className?: string;
}

const coverageSection = BEM(styles);

export const CoverageSection = coverageSection(({ className }: Props) => {
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const { percentage: previousBuildCodeCoverage = 0 } = usePreviousBuildCoverage(previousBuildVersion) || {};
  const { percentage: buildCodeCoverage = 0, finishedScopesCount = 0 } = useBuildVersion<BuildCoverage>('/build/coverage') || {};
  const {
    new: {
      total: newMethodsTotalCount = 0,
      covered: newMethodsCoveredCount = 0,
    } = {},
    modified: {
      total: modifiedMethodsTotalCount = 0,
      covered: modifiedMethodsCoveredCount = 0,
    } = {},
    unaffected: {
      total: unaffectedTotalCount = 0,
      covered: unaffectedCoveredCount = 0,
    } = {},
  } = useBuildVersion<Methods>('/build/methods') || {};
  const { buildVersion = '' } = useParams<{ buildVersion: string }>();
  const buildDiff = percentFormatter(buildCodeCoverage) - percentFormatter(previousBuildCodeCoverage);
  console.log(!buildCodeCoverage && buildVersion !== previousBuildVersion);
  return (
    <div className={className}>
      <Section
        label="Build Coverage"
        info={(
          <>
            {`${percentFormatter(buildCodeCoverage)}%`}
            {Boolean(buildDiff) && (
              <CoverageArrow
                rotate={buildDiff > 0 ? 180 : 0}
                type={buildDiff > 0 ? 'INCREASE' : 'DECREASE'}
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
                    color: COVERAGE_TYPES_COLOR.NEW,
                  },
                  modified: {
                    count: modifiedMethodsTotalCount,
                    value: (modifiedMethodsCoveredCount / modifiedMethodsTotalCount) * 100,
                    color: COVERAGE_TYPES_COLOR.MODIFIED,
                  },
                  unaffected: {
                    count: unaffectedTotalCount,
                    value: (unaffectedCoveredCount / unaffectedTotalCount) * 100,
                    color: COVERAGE_TYPES_COLOR.UNAFFECTED,
                  },
                }}
              />
            )}
          >
            <Panel>
              <SingleBar
                width={32}
                height={128}
                color={COVERAGE_TYPES_COLOR.NEW}
                percent={(newMethodsCoveredCount / newMethodsTotalCount) * 100}
                icon={<Icons.Add />}
              />
              <SingleBar
                width={32}
                height={128}
                color={COVERAGE_TYPES_COLOR.MODIFIED}
                percent={(modifiedMethodsCoveredCount / modifiedMethodsTotalCount) * 100}
                icon={<Icons.Edit height={16} width={16} viewBox="0 0 16 15" />}
              />
              <SingleBar
                width={32}
                height={128}
                color={COVERAGE_TYPES_COLOR.UNAFFECTED}
                percent={(unaffectedCoveredCount / unaffectedTotalCount) * 100}
                icon={<Icons.Check />}
              />
            </Panel>
          </Tooltip>
        )}
        additionalInfo={(
          <Panel>
            {Boolean(buildDiff)
              && (buildVersion === previousBuildVersion || finishedScopesCount > 0)
              && `${buildDiff > 0 ? '+' : '-'}
              ${percentFormatter(Math.abs(buildDiff))}% vs Build: ${previousBuildVersion}`}
            {finishedScopesCount === 0 && 'Will change when at least 1 scope is done.'}
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
