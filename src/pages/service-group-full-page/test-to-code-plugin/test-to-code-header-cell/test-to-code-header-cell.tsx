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
import { Icons } from '@drill4j/ui-kit';
import { BEM, div } from '@redneckz/react-bem-helper';

import { spacesToDashes } from 'utils';

import styles from './test-to-code-header-cell.module.scss';

interface Props {
  className?: string;
  label: string;
  value?: string | number;
  onClick?: () => void;
}

const testToCodeHeaderCell = BEM(styles);

export const TestToCodeHeaderCell = testToCodeHeaderCell(({
  className, label, value, onClick,
}: Props) => (
  <div className={className}>
    <Content>
      <Label>{label}</Label>
      <Value
        onClick={onClick}
        clickable={Boolean(onClick)}
        data-test={`dashboard-header-cell:${spacesToDashes(label)}:value`}
      >
        {value}
        {Boolean(onClick) && <LinkIcon height={8} />}
      </Value>
    </Content>
  </div>
));

const Content = testToCodeHeaderCell.content('div');
const Label = testToCodeHeaderCell.label('div');
const Value = testToCodeHeaderCell.value(
  div({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; clickable?: boolean;'data-test'?: string }),
);
const LinkIcon = testToCodeHeaderCell.linkIcon(Icons.Expander);
