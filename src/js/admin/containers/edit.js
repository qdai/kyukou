import EditComponent from '../components/edit.jsx';
import { connect } from 'react-redux';
import submitHandler from '../utils/submit-handler';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    submitHandler(dispatch, 'edit', new FormData(evt.currentTarget));
  }
});

const Edit = connect(state => state, mapDispatchToProps)(EditComponent);

export default Edit;
