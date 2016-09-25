import AddComponent from '../components/add.jsx';
import { connect } from 'react-redux';
import submitHandler from '../utils/submit-handler';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    submitHandler(dispatch, 'add', new FormData(evt.currentTarget));
  }
});

const Add = connect(state => state, mapDispatchToProps)(AddComponent);

export default Add;
