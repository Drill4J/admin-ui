import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './test-to-code-coverage-cell.module.scss';

interface Props {
  className?: string;
  value?: number;
}

const testToCodeCoverageCell = BEM(styles);

export const TestToCodeCoverageCell = testToCodeCoverageCell(({ className, value = 0 }: Props) => (
  <div className={className}>
    <Content>
      <Value data-test="dashboard-coverage-cell:value">
        {value === undefined ? (
          <Tooltip message={(
            <Panel direction="column">
              <div>Test2Code plugin</div>
              <div>is not installed</div>
            </Panel>
          )}
          >
            n/a
          </Tooltip>
        ) : `${percentFormatter(value)}%`}
      </Value>
    </Content>
  </div>
));

const Content = testToCodeCoverageCell.content('div');
const Value = testToCodeCoverageCell.value(Panel);
