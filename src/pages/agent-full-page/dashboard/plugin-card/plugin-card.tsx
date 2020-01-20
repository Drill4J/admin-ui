import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Link } from 'react-router-dom';

import { Panel } from 'layouts';

import styles from './plugin-card.module.scss';

interface Props {
  className?: string;
  label?: React.ReactNode;
  children?: React.ReactNode[];
  pluginLink: string;
}

const pluginCard = BEM(styles);

export const PluginCard = pluginCard(({
  className, label, children, pluginLink,
}: Props) => (
  <div className={className}>
    <Header align="space-between">
      <span>{label}</span>
      <PluginLink to={pluginLink}>View more &gt;</PluginLink>
    </Header>
    <Content>
      {React.Children.map(children, (child) => (
        <CardSection>{child}</CardSection>
      ))}
    </Content>
  </div>
));

const Header = pluginCard.header(Panel);
const PluginLink = pluginCard.link(Link);
const Content = pluginCard.content('div');
const CardSection = pluginCard.section('div');
