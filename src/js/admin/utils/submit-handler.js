import { fetchApiComplete, loadEvents } from '../actions';
import post from '../utils/post';

const submitHandler = (dispatch, method, formData) => {
  const body = [...formData.entries()].reduce((obj, arr) => {
    obj[arr[0]] = arr[1];
    return obj;
  }, {});
  post(method, body).then(result => {
    dispatch(fetchApiComplete(result));
    if (result.type === 'success') {
      dispatch(loadEvents());
    }
  });
};

export default submitHandler;
