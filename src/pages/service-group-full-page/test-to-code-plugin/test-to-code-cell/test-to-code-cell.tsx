/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BEM, span } from '@redneckz/react-bem-helper';
import { Icons, Tooltip } from '@drill4j/ui-kit';

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
            <div className="d-flex flex-column align-items-center w-100">
              <div>Test2Code plugin</div>
              <div>is not installed</div>
            </div>
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
