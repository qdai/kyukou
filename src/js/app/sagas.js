import { call, put, takeLatest } from 'redux-saga/effects';
import { loadEventsFailire, loadEventsSuccess } from './actions';
import { LOAD_EVENTS_REQUEST } from './action-types';
import requestEvents from '../utils/request-events';

const loadEvents = function* () {
  try {
    const events = yield call(requestEvents);
    yield put(loadEventsSuccess(events));
  } catch (err) {
    yield put(loadEventsFailire(err));
  }
};

const sagas = function* () {
  yield takeLatest(LOAD_EVENTS_REQUEST, loadEvents);
};

export default sagas;
