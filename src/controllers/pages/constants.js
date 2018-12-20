import { NOT_FOUND } from 'redux-first-router';
import { LOGIN_PAGE, FORGOT_PASSWORD_PAGE, PLUGIN_PAGE } from 'common/constants';

// undefined page
export const NO_PAGE = undefined;

export const pageNames = {
  // undefined page
  [NOT_FOUND]: NOT_FOUND,

  // outside pages
  [LOGIN_PAGE]: LOGIN_PAGE,
  [FORGOT_PASSWORD_PAGE]: FORGOT_PASSWORD_PAGE,
  [PLUGIN_PAGE]: PLUGIN_PAGE,
};
