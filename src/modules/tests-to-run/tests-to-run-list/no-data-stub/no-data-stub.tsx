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
import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './no-data-stub.module.scss';

interface Props {
  className?: string;
}

const noDataStub = BEM(styles);

export const NoDataStub = noDataStub(({ className }: Props) => (
  <div className={className}>
    <Icon width={70} height={75} />
    <Title>No data about saved time</Title>
    <SubTitle>There is no information about Auto Tests duration in the parent build.</SubTitle>
  </div>
));

const Icon = noDataStub.icon(Icons.Graph);
const Title = noDataStub.title('div');
const SubTitle = noDataStub.subTitle('div');
