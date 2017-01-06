import EditComponent from '../components/edit.jsx';
import { connect } from 'react-redux';
import { fetchApiRequest } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    dispatch(fetchApiRequest({
      formData: new FormData(evt.currentTarget),
      method: 'edit'
    }));
  }
});

const Edit = connect(state => state, mapDispatchToProps)(EditComponent);

export default Edit;
