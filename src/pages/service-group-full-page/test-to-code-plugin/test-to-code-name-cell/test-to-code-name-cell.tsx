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
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './test-to-code-name-cell.module.scss';

interface Props {
  className?: string;
  name: string;
  additionalInformation?: string;
  onClick?: () => void;
}

const testToCodeNameCell = BEM(styles);

export const TestToCodeNameCell = testToCodeNameCell(
  ({
    className, name, additionalInformation, onClick,
  }: Props) => (
    <div className={className}>
      <NameCell
        className="text-ellipsis link"
        onClick={onClick}
        data-test="test-to-code-name-cell:name-cell"
        title={name}
      >
        {name}
      </NameCell>
      <AdditionalInformation
        className="text-ellipsis link"
        data-test="test-to-code-name-cell:additional-information"
        title={additionalInformation}
      >
        {additionalInformation}
      </AdditionalInformation>
    </div>
  ),
);

const NameCell = testToCodeNameCell.nameCell(div(
  { onClick: () => {}, 'data-test': '', title: '' } as { onClick?: () => void; 'data-test'?: string; title?: string; },
));
const AdditionalInformation = testToCodeNameCell.additionalInformation('div');
