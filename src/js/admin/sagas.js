import { FETCH_API_REQUEST, LOAD_EVENTS_REQUEST } from './action-types';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchApiComplete, loadEventsFailure, loadEventsRequest, loadEventsSuccess } from './actions';
import requestApi from './utils/request-api';
import requestEvents from '../utils/request-events';

const fetchApi = function* (action) {
  try {
    const { method, param, url } = action.payload;
    const result = yield call(requestApi, method, url, param);
    if (result.error) {
      throw new Error(result.error.message);
    }
    yield put(fetchApiComplete({
      message: `Success: ${result.success.message}`,
      type: 'success'
    }));
    yield put(loadEventsRequest());
  } catch (err) {
    yield put(fetchApiComplete({
      message: `Error: ${err.message}`,
      type: 'danger'
    }));
  }
};

const loadEvents = function* () {
  try {
    const events = yield call(requestEvents);
    yield put(loadEventsSuccess(events));
  } catch (err) {
    yield put(loadEventsFailure(err));
  }
};

const sagas = function* () {
  yield takeEvery(FETCH_API_REQUEST, fetchApi);
  yield takeLatest(LOAD_EVENTS_REQUEST, loadEvents);
};

export default sagas;
