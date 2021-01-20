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

import styles from './coverage-rate-icon.module.scss';

interface Props {
  className?: string;
  coverageRate?: 'MISSED' | 'PARTLY' | 'FULL';
}

const coverageRateIcon = BEM(styles);

export const CoverageRateIcon = coverageRateIcon(({ className, coverageRate }: Props) => (
  <div className={className}>
    <IconWrapper rate={coverageRate}>
      {coverageRate === 'FULL' ? (
        <Icons.Checkbox height={16} width={16} />
      ) : (
        <Icons.Warning height={16} width={16} />
      )}
    </IconWrapper>
  </div>
));

const IconWrapper = coverageRateIcon.iconWrapper(div({} as { rate?: string }));
