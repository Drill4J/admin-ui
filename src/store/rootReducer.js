import { reducer as formReducer } from 'redux-form';
import { langReducer } from 'controllers/lang';
import { modalReducer } from 'controllers/modal';
import { screenLockReducer } from 'controllers/screenLock';
import { notificationReducer } from 'controllers/notification';

export default {
  lang: langReducer,
  form: formReducer,
  modal: modalReducer,
  notifications: notificationReducer,
  screenLock: screenLockReducer,
};
