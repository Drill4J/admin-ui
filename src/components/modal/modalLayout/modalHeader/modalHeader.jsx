import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './modalHeader.scss';
import CloseIcon from '../img/icon-close-inline.svg';

const cx = classNames.bind(styles);

export const ModalHeader = ({ title, onClose }) => (
  <div className={cx('modal-header')}>
    <span className={cx('modal-title')}>{title}</span>
    <div className={cx('close-modal-icon')} onClick={onClose}>
      {Parser(CloseIcon)}
    </div>
  </div>
);

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

ModalHeader.defaultProps = {
  title: '',
  onClose: () => {},
};
