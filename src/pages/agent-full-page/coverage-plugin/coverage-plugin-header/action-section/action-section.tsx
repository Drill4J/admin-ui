import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel, Tooltip } from '@drill4j/ui-kit';

import styles from './action-section.module.scss';

interface Props {
  className?: string;
  label?: React.ReactNode;
  count?: number;
  previousBuildVersion?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const actionSection = BEM(styles);

export const ActionSection = actionSection(
  ({
    className, label, count, onClick, previousBuildVersion,
  }: Props) => (
    <div className={className}>
      <Action data-test={`action-section:action:${label}`}>
        <Tooltip
          message={!previousBuildVersion && (
            <TooltipMessage>
              There are no data about {label} on the initial build.<br />
              It will be calculated when at least 1 parent build appears.
            </TooltipMessage>
          )}
        >
          <ActionName>{label}</ActionName>
        </Tooltip>
        {previousBuildVersion ? (
          <Count onClick={onClick} data-test={`action-section:count:${label}`}>
            {count}
            <LinkIcon width={8} height={8} />
          </Count>
        ) : <NoValue data-test={`action-section:no-value:${label}`}>&ndash;</NoValue>}
      </Action>
    </div>
  ),
);

const Action = actionSection.action('div');
const ActionName = actionSection.actionName('div');
const Count = actionSection.count(Panel);
const LinkIcon = actionSection.linkIcon(Icons.Expander);
const NoValue = actionSection.noValue('div');
const TooltipMessage = actionSection.tooltipMessage('div');
