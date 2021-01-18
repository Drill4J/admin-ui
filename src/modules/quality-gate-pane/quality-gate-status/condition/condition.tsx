import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './condition.module.scss';

interface Props {
  className?: string;
  passed: boolean;
  type: 'coverage' | 'risks' | 'testsToRun';
  children: React.ReactNode;
  thresholdValue: string;
}

const condition = BEM(styles);

export const Condition = condition(
  ({
    className, passed, type, children, thresholdValue,
  }: Props) => {
    const title = {
      coverage: 'Build coverage',
      risks: 'Risks',
      testsToRun: 'Suggested “Tests to run” executed',
    };
    return (
      <div className={className}>
        {passed ? <Passed width={16} height={16} /> : <Failed width={16} height={16} />}
        <Content>
          {title[type]}
          {children}
        </Content>
        <ThresholdValue data-test={`quality-gate-status:condition:${type}`}>
          {type === 'coverage' ? `${percentFormatter(Number(thresholdValue))}%` : thresholdValue }
        </ThresholdValue>
      </div>
    );
  },
);

const Passed = condition.passed(Icons.Checkbox);
const Failed = condition.failed(Icons.Warning);
const Content = condition.content('div');
const ThresholdValue = condition.thresholdValue('span');
