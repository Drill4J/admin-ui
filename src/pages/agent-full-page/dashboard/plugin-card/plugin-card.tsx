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
import { Children, ReactNode } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Link } from 'react-router-dom';

import styles from './plugin-card.module.scss';

interface Props {
  className?: string;
  label?: ReactNode;
  children?: ReactNode[];
  pluginLink: string;
}

const pluginCard = BEM(styles);

export const PluginCard = pluginCard(({
  className, label, children, pluginLink,
}: Props) => (
  <div className={className}>
    <Header className="d-flex justify-content-between items-center w-full p-4">
      <span className="text-uppercase">{label}</span>
      <PluginLink to={pluginLink}>View more &gt;</PluginLink>
    </Header>
    <Content>
      {Children.map(children, (child) => (
        <CardSection>{child}</CardSection>
      ))}
    </Content>
  </div>
));

const Header = pluginCard.header('div');
const PluginLink = pluginCard.link(Link);
const Content = pluginCard.content('div');
const CardSection = pluginCard.section('div');
