import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';

import { LoginPage } from '../pages';

import styles from './page-switcher.module.scss';

interface Props {
  className?: string;
  page?: string;
}

const pageSwitcher = BEM(styles);

export const PageSwitcher = pageSwitcher(({ className }: Props) => {
  return (
    <div className={className}>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        {/* <Route exact path={page} compoent={component} /> */}
        {/* <Route compoent={NotFoundPage} /> */}
      </Switch>
    </div>
  );
});
