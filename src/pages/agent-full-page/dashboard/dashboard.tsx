import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './dashboard.module.scss';

interface Props {
  className?: string;
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({ className }: Props) => (
  <div className={className}>
    <Header>Dashboard</Header>
    <Content>Some useful content</Content>
  </div>
));

const Header = dashboard.header('div');
const Content = dashboard.content('div');
