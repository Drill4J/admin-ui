import PropTypes from 'prop-types';

export const EventColumn = ({ data }) => <div>{data.message}</div>;

EventColumn.propTypes = {
  data: PropTypes.object.isRequired,
};
