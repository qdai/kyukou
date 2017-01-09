import { call, put, takeLatest } from 'redux-saga/effects';
import { loadLogsFailure, loadLogsSuccess } from './actions';
import { LOAD_LOGS_REQUEST } from './action-types';
import requestLogs from './utils/request-logs';

const loadLogs = function* () {
  try {
    const logs = yield call(requestLogs);
    yield put(loadLogsSuccess(logs));
  } catch (err) {
    yield put(loadLogsFailure(err));
  }
};

const sagas = function* () {
  yield takeLatest(LOAD_LOGS_REQUEST, loadLogs);
};

export default sagas;
