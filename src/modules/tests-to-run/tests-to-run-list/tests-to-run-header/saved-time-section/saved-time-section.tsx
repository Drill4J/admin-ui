import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import styles from './saved-time-section.module.scss';

interface Props {
  className?: string;
  percentage?: number;
  previousBuildAutoTestsCount: number;
  message: React.ReactNode;
  children: React.ReactNode;
  label: React.ReactNode;
}

const savedTimeSection = BEM(styles);

export const SavedTimeSection = savedTimeSection(
  ({
    className, label, percentage, message, children, previousBuildAutoTestsCount,
  }: Props) => (
    <div className={className}>
      <Content data-test={`information-section:${label}`}>
        <Tooltip
          message={message && <Message>{message}</Message>}
        >
          <Title>{label}</Title>
          <Value verticalAlign="center">
            <Duration>{previousBuildAutoTestsCount ? children : 'n/a'}</Duration>
            {Boolean(percentage) && <Percentage>{percentage}%</Percentage>}
          </Value>
        </Tooltip>
      </Content>
    </div>
  ),
);

const Content = savedTimeSection.content('div');
const Title = savedTimeSection.title('div');
const Duration = savedTimeSection.duration('span');
const Percentage = savedTimeSection.percentage('span');
const Value = savedTimeSection.value(Panel);
const Message = savedTimeSection.message(Panel);
