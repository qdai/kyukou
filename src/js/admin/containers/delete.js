import DeleteComponent from '../components/delete.jsx';
import { connect } from 'react-redux';
import { fetchApiRequest } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    dispatch(fetchApiRequest({
      formData: new FormData(evt.currentTarget),
      method: 'delete'
    }));
  }
});

const Delete = connect(state => state, mapDispatchToProps)(DeleteComponent);

export default Delete;
