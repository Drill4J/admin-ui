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

import styles from './no-tests-to-run-stub.module.scss';

interface Props {
  className?: string;
}

const noTestsToRunStub = BEM(styles);

export const NoTestsToRunStub = noTestsToRunStub(({ className }: Props) => (
  <div className={className}>
    <Icon width={80} height={80} />
    <Title>No suggested tests</Title>
    <SubTitle>There is no information about the suggested to run tests<br /> in this build.</SubTitle>
  </div>
));

const Icon = noTestsToRunStub.icon(Icons.Test);
const Title = noTestsToRunStub.title('div');
const SubTitle = noTestsToRunStub.subTitle('div');
