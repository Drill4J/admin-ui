import PropTypes from 'prop-types';

export const EventColumn = ({ data }) => (
  <div>
    {data.type} {data.message}
  </div>
);

EventColumn.propTypes = {
  data: PropTypes.object.isRequired,
};
