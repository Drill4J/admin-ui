import PropTypes from 'prop-types';

export const TimeColumn = ({ data }) => <div>{data.occurredTime}</div>;

TimeColumn.propTypes = {
  data: PropTypes.object.isRequired,
};
