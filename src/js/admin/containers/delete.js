import DeleteComponent from '../components/delete.jsx';
import { connect } from 'react-redux';
import { fetchApiRequest } from '../actions';
import { siteUrl } from '../../utils/constant';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    const hash = new FormData(evt.currentTarget).get('hash');
    dispatch(fetchApiRequest({
      method: 'DELETE',
      url: `${siteUrl}/admin/events/${hash}`
    }));
  }
});

const Delete = connect(state => state, mapDispatchToProps)(DeleteComponent);

export default Delete;
