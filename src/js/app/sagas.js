import { effects, takeLatest } from 'redux-saga';
import { loadEventsFailire, loadEventsSuccess } from './actions';
import { LOAD_EVENTS_REQUEST } from './action-types';
import requestEvents from '../utils/request-events';

const loadEvents = function* () {
  try {
    const events = yield effects.call(requestEvents);
    yield effects.put(loadEventsSuccess(events));
  } catch (err) {
    yield effects.put(loadEventsFailire(err));
  }
};

const sagas = function* () {
  yield takeLatest(LOAD_EVENTS_REQUEST, loadEvents);
};

export default sagas;
