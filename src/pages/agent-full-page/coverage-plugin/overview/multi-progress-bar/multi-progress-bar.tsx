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
      <ScopeCoverage style={{ left: `${buildCodeCoverage - overlappingCode}%` }}>
        <Tooltip
          customStyle={{ bottom: '30px', left: '50%' }}
          position="top"
          message={(
            <Message>
              <div>
                {`${percentFormatter(overlappingCode)}% of current build`}
              </div>
              <div>were overlapped in active scope.</div>
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
      </ScopeCoverage>
    </div>
  );
});

const Message = multiProgressBar.message('div');
const ScopeCoverage = multiProgressBar.scopeCoverage('div');
const OverlappingCodeProgressBar = multiProgressBar.overlappingCodeProgressBar('div');
