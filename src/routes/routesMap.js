import { redirect } from 'redux-first-router';
import { LOGIN_PAGE, FORGOT_PASSWORD_PAGE, PLUGIN_PAGE } from 'common/constants';

export default {
  empty: {
    path: '/',
    thunk: (dispatch) => {
      dispatch(
        redirect({
          type: LOGIN_PAGE,
        }),
      );
    },
  },
  [LOGIN_PAGE]: '/login',
  [FORGOT_PASSWORD_PAGE]: '/forgotPassword',
  [PLUGIN_PAGE]: '/plugin/:id',
};
