import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { useClickOutside } from 'hooks';
import { Icons } from 'components';
import { useBaseline, setAsBaseline, setIsExpanded } from './use-baseline';

import styles from './build-versions-dropdown.module.scss';

interface Props {
  className?: string;
}

const buildVersionsDropdown = BEM(styles);

export const BuildVersionsDropdown = buildVersionsDropdown(({ className }: Props) => {
  const {
    state: { buildVersions, currentBuildVersion: { version, prevVersion }, isExpanded }, dispatch,
  } = useBaseline();
  const { buildVersion: selectedAsBaselineBuildVersion } = buildVersions.find(buildVersion => buildVersion.selectedAsBaseline) || {};
  const node = useClickOutside(() => dispatch(setIsExpanded(false)));

  return (
    <div className={className} ref={node}>
      <div onClick={() => dispatch(setIsExpanded(!isExpanded))}>
        <CurrentBuildVersion>
          Build {version} vs.
        </CurrentBuildVersion>
        &nbsp;
        <BaselineBuildVersion>
          {selectedAsBaselineBuildVersion || prevVersion}
          <FilledStar width={8} height={8} /> <Expander width={8} height={8} rotate={isExpanded ? -90 : 90} />
        </BaselineBuildVersion>
      </div>
      {isExpanded && (
        <BuildVersionsListWrapper>
          <BuildVersionsList>
            {buildVersions.map(({ buildVersion, selectedAsBaseline }) => (
              <BuildVersion key={buildVersion}>
                {buildVersion === prevVersion && !selectedAsBaselineBuildVersion
                  ? <DefaultBaseline width={16} height={16} /> : (
                    <BaselineStar
                      onClick={() => dispatch(setAsBaseline(buildVersion))}
                      selected={selectedAsBaseline}
                    >
                      {selectedAsBaseline ? <Icons.StarFilled width={16} height={16} /> : <Icons.Star width={16} height={16} /> }
                    </BaselineStar>
                  )}
                Build {buildVersion} {buildVersion === prevVersion && '(by default)'}
              </BuildVersion>
            ))}
          </BuildVersionsList>
        </BuildVersionsListWrapper>
      )}
    </div>
  );
});

const CurrentBuildVersion = buildVersionsDropdown.currentBuildVersion('span');
const FilledStar = buildVersionsDropdown.filledStar(Icons.StarFilled);
const Expander = buildVersionsDropdown.expander(Icons.Expander);
const BaselineBuildVersion = buildVersionsDropdown.baselineBuildVersion('span');
const BuildVersionsListWrapper = buildVersionsDropdown.buildVersionsListWrapper('div');
const BuildVersionsList = buildVersionsDropdown.buildVersionsList('div');
const BuildVersion = buildVersionsDropdown.buildVersion('div');
const DefaultBaseline = buildVersionsDropdown.defaultBaseline(Icons.Check);
const BaselineStar = buildVersionsDropdown.baselineStar(div({ onClick: () => {} } as {onClick(): void; selected?: boolean}));
