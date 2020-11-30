import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';
import { Icons, Panel, Tooltip } from '@drill4j/ui-kit';

import styles from './test-to-code-cell.module.scss';

interface Props {
  className?: string;
  value: number;
  onClick?: () => void;
  testContext?: string;
}

const testToCodeCell = BEM(styles);

export const TestToCodeCell = testToCodeCell(({
  className, value, onClick, testContext,
}: Props) => (
  <div className={className}>
    <Content>
      <Value onClick={onClick} clickable={Boolean(onClick)} data-test={`dashboard-cell:value:${testContext}`}>
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
        ) : value}
        {Boolean(onClick) && <LinkIcon height={8} />}
      </Value>
    </Content>
  </div>
));

const Content = testToCodeCell.content('div');
const Value = testToCodeCell.value(
  span({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; clickable?: boolean; 'data-test'?: string }),
);
const LinkIcon = testToCodeCell.linkIcon(Icons.Expander);
