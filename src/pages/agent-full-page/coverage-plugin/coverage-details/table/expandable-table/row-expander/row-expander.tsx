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
import { Icons } from '@drill4j/ui-kit';

import styles from './row-expander.module.scss';

interface Props {
  className?: string;
  expanded?: boolean;
  onClick: () => void;
}

const rowExpander = BEM(styles);

export const RowExpander = rowExpander(({
  className, expanded, onClick,
}: Props) => (
  <div className={className} onClick={onClick}>
    <IconWrapper expanded={expanded} data-test="row-expander">
      <Icons.Expander />
    </IconWrapper>
  </div>
));

const IconWrapper = rowExpander.icon(div({ 'data-test': '' } as { expanded?: boolean; 'data-test': string }));
