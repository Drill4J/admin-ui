import { Children, ReactNode } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Link } from 'react-router-dom';
import { Panel } from '@drill4j/ui-kit';

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
    <Header align="space-between">
      <span>{label}</span>
      <PluginLink to={pluginLink}>View more &gt;</PluginLink>
    </Header>
    <Content>
      {Children.map(children, (child) => (
        <CardSection>{child}</CardSection>
      ))}
    </Content>
  </div>
));

const Header = pluginCard.header(Panel);
const PluginLink = pluginCard.link(Link);
const Content = pluginCard.content('div');
const CardSection = pluginCard.section('div');
