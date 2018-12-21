import PropTypes from 'prop-types';

export const ActionsColumn = ({ data, actions }) => (
  <div>
    <button onClick={() => actions.onDeleteStackTrace(data.id)}>delete</button>
  </div>
);

ActionsColumn.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    onDeleteStackTrace: PropTypes.func.isRequired,
  }).isRequired,
};
