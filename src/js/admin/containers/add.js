import AddComponent from '../components/add.jsx';
import { connect } from 'react-redux';
import { fetchApiRequest } from '../actions';
import { siteUrl } from '../../utils/constant';

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault();
    const param = [...new FormData(evt.currentTarget).entries()].reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value
    }), {});
    dispatch(fetchApiRequest({
      method: 'POST',
      param,
      url: `${siteUrl}/admin/events`
    }));
  }
});

const Add = connect(state => state, mapDispatchToProps)(AddComponent);

export default Add;
