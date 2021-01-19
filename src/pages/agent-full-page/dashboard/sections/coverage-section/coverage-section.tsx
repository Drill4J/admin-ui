import { BEM } from '@redneckz/react-bem-helper';
import { NavLink, useParams } from 'react-router-dom';
import { EllipsisOverflowText, Tooltip } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { BuildSummary } from 'types/build-summary';
import { Methods } from 'types/methods';
import { COVERAGE_TYPES_COLOR } from 'common/constants';
import { ParentBuild } from 'types/parent-build';
import { SingleBar, CoverageSectionTooltip, DashboardSection } from 'components';
import { useBuildVersion } from 'hooks';
import { usePreviousBuildCoverage } from '../../../coverage-plugin/use-previous-build-coverage';

import styles from './coverage-section.module.scss';

interface Props {
  className?: string;
}

const coverageSection = BEM(styles);

export const CoverageSection = coverageSection(({ className }: Props) => {
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const { percentage: previousBuildCodeCoverage = 0 } = usePreviousBuildCoverage(previousBuildVersion) || {};
  const { coverage: buildCodeCoverage = 0, scopeCount = 0 } = useBuildVersion<BuildSummary>('/build/summary') || {};
  const {
    all: {
      total: allMethodsTotalCount = 0,
      covered: allMethodsCoveredCount = 0,
    } = {},
    new: {
      total: newMethodsTotalCount = 0,
      covered: newMethodsCoveredCount = 0,
    } = {},
    modified: {
      total: modifiedMethodsTotalCount = 0,
      covered: modifiedMethodsCoveredCount = 0,
    } = {},
  } = useBuildVersion<Methods>('/build/methods') || {};
  const { agentId = '' } = useParams<{ agentId: string }>();
  const tooltipData = {
    totalCovered: {
      total: allMethodsTotalCount,
      covered: allMethodsCoveredCount,
    },
    new: {
      total: newMethodsTotalCount,
      covered: newMethodsCoveredCount,
    },
    modified: {
      total: modifiedMethodsTotalCount,
      covered: modifiedMethodsCoveredCount,
    },
  };
  const buildDiff = percentFormatter(buildCodeCoverage) - percentFormatter(previousBuildCodeCoverage);
  const isFirstBuild = !previousBuildVersion;

  return (
    <div className={className}>
      <DashboardSection
        label="Build Coverage"
        info={`${percentFormatter(buildCodeCoverage)}%`}
        graph={(
          <BarTooltip message={<CoverageSectionTooltip data={tooltipData} />}>
            <SingleBar
              width={108}
              height={128}
              color={COVERAGE_TYPES_COLOR.TOTAL}
              percent={percentFormatter(buildCodeCoverage)}
            />
            {!isFirstBuild && <BaselineBuild style={{ bottom: `${previousBuildCodeCoverage}%` }} />}
          </BarTooltip>
        )}
        additionalInfo={(
          Boolean(buildDiff) && !isFirstBuild && scopeCount > 0 && (
            <BuildInfo>
              {`${buildDiff > 0 ? '+' : '-'} ${percentFormatter(Math.abs(buildDiff))}% vs`}
              <EllipsisOverflowText>
                <Link to={`/full-page/${agentId}/${previousBuildVersion}/dashboard`} title={`Build ${previousBuildVersion}`}>
                  &nbsp;Build {previousBuildVersion}
                </Link>
              </EllipsisOverflowText>
            </BuildInfo>
          ))}
      />
    </div>
  );
});

const Link = coverageSection.link(NavLink);
const BuildInfo = coverageSection.buildInfo('div');
const BaselineBuild = coverageSection.baselineBuild('div');
const BarTooltip = coverageSection.barTooltip(Tooltip);
