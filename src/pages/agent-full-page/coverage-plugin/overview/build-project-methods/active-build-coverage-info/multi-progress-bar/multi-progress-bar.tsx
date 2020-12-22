import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  MainProgressBar, AdditionalProgressBar, StripedProgressBar, Tooltip, useElementSize,
} from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './multi-progress-bar.module.scss';

interface Props {
  className?: string;
  buildCodeCoverage: number;
  uniqueCodeCoverage: number;
  overlappingCode: number;
  active: boolean;
}

const multiProgressBar = BEM(styles);

export const MultiProgressBar = multiProgressBar(({
  className, buildCodeCoverage = 0, uniqueCodeCoverage = 0, overlappingCode = 0, active,
}: Props) => {
  const node = React.useRef<HTMLDivElement>(null);
  const { width } = useElementSize(node);

  return (
    <div className={className} ref={node}>
      <Tooltip
        message={(
          <Message>
            <b>{percentFormatter(buildCodeCoverage)}%</b> of current build has <br />
            already been covered by tests
          </Message>
        )}
      >
        <MainProgressBar value={`${buildCodeCoverage * (width / 100)}px`} testContext="build-coverage" />
      </Tooltip>
      <ScopeCoverage style={{ left: `${buildCodeCoverage - overlappingCode}%` }}>
        <Tooltip
          message={(
            <Message>
              <b>{percentFormatter(overlappingCode)}%</b> of current build coverage <br /> has been overlapped in active scope
            </Message>
          )}
        >
          <OverlappingCodeProgressBar
            data-test="multi-progress-bar:overlapping-code-progress-bar"
            style={{ width: `${overlappingCode * (width / 100)}px` }}
          >
            {active
              ? <StripedProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />
              : <AdditionalProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />}
          </OverlappingCodeProgressBar>
        </Tooltip>
        <Tooltip
          message={(
            <Message>
              Active scope additionally covered <b>+{percentFormatter(uniqueCodeCoverage)}%</b>. <br />
              Finish your scope to add it to your total build coverage.
            </Message>
          )}
        >
          {active
            ? <StripedProgressBar type="primary" value={`${uniqueCodeCoverage * (width / 100)}px`} />
            : (
              <AdditionalProgressBar
                type="primary"
                value={`${uniqueCodeCoverage * (width / 100)}px`}
                testContext="unique-code-progress-bar"
              />
            )}
        </Tooltip>
      </ScopeCoverage>
    </div>
  );
});

const Message = multiProgressBar.message('div');
const ScopeCoverage = multiProgressBar.scopeCoverage('div');
const OverlappingCodeProgressBar = multiProgressBar.overlappingCodeProgressBar('div');
