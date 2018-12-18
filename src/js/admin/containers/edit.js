import EditComponent from '../components/edit.jsx';
import { connect } from 'react-redux';
import { fetchApiRequest } from '../actions';
import { siteUrl } from '../../utils/constant';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const hash = formData.get('hash');
    const param = { [formData.get('key')]: formData.get('value') };
    dispatch(fetchApiRequest({
      method: 'PUT',
      param,
      url: `${siteUrl}/admin/events/${hash}`
    }));
  }
});

const Edit = connect(state => state, mapDispatchToProps)(EditComponent);

export default Edit;
