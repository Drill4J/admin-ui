import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { defineMessages, injectIntl } from 'react-intl';
import { GLOBAL, LOCAL } from 'common/constants';
import styles from '../exceptionsGrid.scss';

const cx = classNames.bind(styles);

const messages = defineMessages({
  [GLOBAL]: {
    id: 'ExceptionsGridType.global',
    defaultMessage: 'Global',
  },
  [LOCAL]: {
    id: 'ExceptionsGridType.local',
    defaultMessage: 'Local',
  },
  default: {
    id: 'ExceptionsGridType.default',
    defaultMessage: 'Undefined',
  },
});

export const TypeColumn = injectIntl(({ intl, data }) => (
  <div>
    <i className={cx('event-type-mark', { local: data.eventType === LOCAL })} />
    <span>{intl.formatMessage(messages[data.eventType || 'default'])}</span>
  </div>
));

TypeColumn.propTypes = {
  data: PropTypes.object.isRequired,
};
