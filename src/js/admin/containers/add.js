import AddComponent from '../components/add.jsx';
import { connect } from 'react-redux';
import { fetchApiRequest } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    dispatch(fetchApiRequest({
      formData: new FormData(evt.currentTarget),
      method: 'add'
    }));
  }
});

const Add = connect(state => state, mapDispatchToProps)(AddComponent);

export default Add;
