import { LOAD_LOG_FAILURE, LOAD_LOG_REQUEST, LOAD_LOG_SUCCESS } from './action-types';
import formatLog from './utils/format-log';
import { handleActions } from 'redux-actions';
import { logNames } from '../utils/constant';

export const initialState = {
  loadError: null,
  loading: false,
  logs: []
};

const reducer = handleActions({
  [LOAD_LOG_FAILURE]: (state, action) => Object.assign({}, state, {
    loadError: action.payload.message,
    loading: false
  }),
  [LOAD_LOG_REQUEST]: state => Object.assign({}, state, {
    loadError: null,
    loading: true
  }),
  [LOAD_LOG_SUCCESS]: (state, action) => {
    const log = formatLog(action.payload);
    const logs = [...state.logs];
    logs[logNames.indexOf(log.name)] = log;
    return Object.assign({}, state, {
      loadError: null,
      loading: false,
      logs
    });
  }
}, initialState);

export default reducer;
