import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Tooltip } from '@drill4j/ui-kit';

import { TestTypeSummary } from 'types/test-type-summary';
import { spacesToDashes } from 'utils';

import styles from './action-section.module.scss';

interface PreviousBuild {
  previousBuildVersion?: string;
  previousBuildTests?: TestTypeSummary[];
}

interface Props {
  className?: string;
  label?: string;
  previousBuild?: PreviousBuild;
  children?: React.ReactNode;
}

const actionSection = BEM(styles);

export const ActionSection = actionSection(
  ({
    className, label = '', previousBuild: { previousBuildVersion = '', previousBuildTests = [] } = {}, children,
  }: Props) => (
    <div className={className}>
      <Action data-test={`action-section:action:${label}`}>
        <Tooltip
          position={label === 'risks' ? 'top-center' : 'top-left'}
          message={getTooltipMessage(label, previousBuildVersion, previousBuildTests.length)}
        >
          <ActionName>{label}</ActionName>
          {previousBuildVersion ? children : <span data-test={`action-section:no-value:${spacesToDashes(label)}`}>&ndash;</span> }
        </Tooltip>
      </Action>
    </div>
  ),
);

const Action = actionSection.action('div');
const ActionName = actionSection.actionName('div');
const TooltipMessage = actionSection.tooltipMessage('div');

function getTooltipMessage(label: string, buildVersion: string, testsCount: number) {
  if (!buildVersion) {
    return (
      <TooltipMessage>
        There are no data about {label} on the initial build.<br />
        It will be calculated when at least 1 parent build appears.
      </TooltipMessage>
    );
  }
  if (buildVersion && testsCount === 0 && label === 'tests to run') {
    return (
      <TooltipMessage>
        There are no tests in the parent build<br />
        to create a list of suggested tests to run
      </TooltipMessage>
    );
  }
  return undefined;
}
