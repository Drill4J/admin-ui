import { BEM } from '@redneckz/react-bem-helper';

import { NotImplementedStub } from 'modules';
import { PageHeader } from '../../components';

import styles from './application-settings-page.module.scss';

const applicationSettingsPage = BEM(styles);

export const ApplicationSettingsPage = applicationSettingsPage(({ className }) => (
  <div className={className}>
    <PageHeader title="Application settings" />
    <NotImplementedStub />
  </div>
));
