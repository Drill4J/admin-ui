import * as React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { TOKEN_KEY } from 'common/constants';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export function isAuth() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { component, ...rest } = props;
  const Component = component;

  return (
    <Route
      render={() => (isAuth() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />)}
      {...rest}
    />
  );
}
