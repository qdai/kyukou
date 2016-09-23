import DeleteComponent from '../components/delete.jsx';
import { connect } from 'react-redux';
import submitHandler from '../utils/submit-handler';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    submitHandler(dispatch, 'delete', new FormData(evt.currentTarget));
  }
});

const Delete = connect(state => state, mapDispatchToProps)(DeleteComponent);

export default Delete;
