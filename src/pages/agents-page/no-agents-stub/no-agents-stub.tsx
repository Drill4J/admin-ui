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
import { BEM, tag } from '@redneckz/react-bem-helper';

import { ReactComponent as NoAgentsSvg } from './no-agents.svg';

import styles from './no-agents-stub.module.scss';

interface Props {
  className?: string;
}

const noAgentsStub = BEM(styles);

export const NoAgentsStub = noAgentsStub(({ className }: Props) => (
  <div className={className}>
    <NoAgentsSvg />
    <Title>No agents online at the moment</Title>
    <SubTitle>
      Run your application with Drill4J Agent using&nbsp;
      <Link
        href="https://drill4j.github.io/how-to-start/"
        rel="noopener noreferrer"
        target="_blank"
      >
        this guide.
      </Link>
    </SubTitle>
  </div>
));

const Title = noAgentsStub.title('div');
const SubTitle = noAgentsStub.subTitle('div');
const Link = noAgentsStub.link(
  tag('a')({ href: '', rel: '', target: '' } as { href: string; rel: string; target: string }),
);
