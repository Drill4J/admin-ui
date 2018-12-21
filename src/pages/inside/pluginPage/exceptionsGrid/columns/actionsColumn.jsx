import PropTypes from 'prop-types';

export const ActionsColumn = ({ data, actions }) => (
  <div>
    <span>expand</span>
    <span>collapse</span>
    <span>copy</span>
    <span>download</span>
    <span onClick={() => actions.onDeleteStackTrace(data.id)}>delete</span>
  </div>
);

ActionsColumn.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    onDeleteStackTrace: PropTypes.func.isRequired,
  }).isRequired,
};
