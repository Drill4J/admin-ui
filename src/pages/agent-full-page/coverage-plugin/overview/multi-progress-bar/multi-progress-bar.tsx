import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  MainProgressBar, AdditionalProgressBar, StripedProgressBar, Tooltip, useElementSize,
} from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './multi-progress-bar.module.scss';

interface Props {
  className?: string;
  buildCodeCoverage?: number;
  uniqueCodeCoverage?: number;
  overlappingCode?: number;
  active?: boolean;
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
        customStyle={{ bottom: '40px', left: '50%' }}
        position="top"
        message={(
          <Message>
            <div>
              {`${percentFormatter(buildCodeCoverage)}% of current build`}
            </div>
            <div>have been already covered by tests.</div>
          </Message>
        )}
      >
        <MainProgressBar value={`${buildCodeCoverage * (width / 100)}px`} testContext="build-coverage" />
      </Tooltip>
      <OverlappingCodeProgressBar
        data-test="multi-progress-bar:overlapping-code-progress-bar"
        style={{ left: `${buildCodeCoverage - overlappingCode}%`, width: `${overlappingCode * (width / 100)}px` }}
      >
        <Tooltip
          customStyle={{ top: '30px', left: '50%', height: '50px' }}
          position="bottom"
          message={(
            <Message style={{ transform: 'scale(-1)' }}>
              <div>
                {`${percentFormatter(overlappingCode)}% of current build`}
              </div>
              <div>were overlapped in active scope.</div>
            </Message>
          )}
        >
          {active
            ? <StripedProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />
            : <AdditionalProgressBar type="secondary" value={`${overlappingCode * (width / 100)}px`} />}
        </Tooltip>
      </OverlappingCodeProgressBar>
      <UniqueCodeCoverageProgressBar
        data-test="multi-progress-bar:unique-code-coverage-progress-bar"
        style={{ left: `${buildCodeCoverage}%` }}
      >
        <Tooltip
          customStyle={{ bottom: '30px', left: '50%' }}
          position="top"
          message={(
            <Message>
              <div>
                {`Active scope has covered +${percentFormatter(uniqueCodeCoverage)}%.`}
              </div>
              <div>Finish your scope to add it to your total build coverage.</div>
            </Message>
          )}
        >
          {active
            ? <StripedProgressBar type="primary" value={`${uniqueCodeCoverage * (width / 100)}px`} />
            : <AdditionalProgressBar type="primary" value={`${uniqueCodeCoverage * (width / 100)}px`} />}
        </Tooltip>
      </UniqueCodeCoverageProgressBar>
    </div>
  );
});

const Message = multiProgressBar.message('div');
const OverlappingCodeProgressBar = multiProgressBar.overlappingCodeProgressBar('div');
const UniqueCodeCoverageProgressBar = multiProgressBar.uniqueCodeCoverageProgressBar('div');
