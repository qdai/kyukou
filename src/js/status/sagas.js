import { effects, takeLatest } from 'redux-saga';
import { loadLogsFailure, loadLogsSuccess } from './actions';
import { LOAD_LOGS_REQUEST } from './action-types';
import requestLogs from './utils/request-logs';

const loadLogs = function* () {
  try {
    const logs = yield effects.call(requestLogs);
    yield effects.put(loadLogsSuccess(logs));
  } catch (err) {
    yield effects.put(loadLogsFailure(err));
  }
};

const sagas = function* () {
  yield takeLatest(LOAD_LOGS_REQUEST, loadLogs);
};

export default sagas;
