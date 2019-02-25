import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader } from '../../components';

import styles from './settings-page.module.scss';

const settingsPage = BEM(styles);

export const SettingsPage = settingsPage(({ className }) => (
  <div className={className}>
    <PageHeader title="Application settings" />
  </div>
));
