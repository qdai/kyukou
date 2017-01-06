import { FETCH_API_REQUEST, LOAD_EVENTS_REQUEST } from './action-types';
import { effects, takeEvery, takeLatest } from 'redux-saga';
import { fetchApiComplete, loadEventsFailire, loadEventsRequest, loadEventsSuccess } from './actions';
import requestApi from './utils/request-api';
import requestEvents from '../utils/request-events';

const fetchApi = function* (action) {
  try {
    const { method, formData } = action.payload;
    const result = yield effects.call(requestApi, method, formData);
    if (result.error) {
      throw new Error(result.error.message);
    }
    yield effects.put(fetchApiComplete({
      message: `Success: ${result.success.message}`,
      type: 'success'
    }));
    yield effects.put(loadEventsRequest());
  } catch (err) {
    yield effects.put(fetchApiComplete({
      message: `Error: ${err.message}`,
      type: 'danger'
    }));
  }
};

const loadEvents = function* () {
  try {
    const events = yield effects.call(requestEvents);
    yield effects.put(loadEventsSuccess(events));
  } catch (err) {
    yield effects.put(loadEventsFailire(err));
  }
};

const sagas = function* () {
  yield takeEvery(FETCH_API_REQUEST, fetchApi);
  yield takeLatest(LOAD_EVENTS_REQUEST, loadEvents);
};

export default sagas;
