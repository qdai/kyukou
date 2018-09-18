import { LOAD_LOGS_FAILURE, LOAD_LOGS_REQUEST, LOAD_LOGS_SUCCESS } from './action-types';
import formatLog from './utils/format-log';
import { handleActions } from 'redux-actions';

const initialState = {
  loadError: null,
  loading: false,
  logs: []
};

const reducer = handleActions({
  [LOAD_LOGS_FAILURE]: (state, action) => ({
    ...state,
    loadError: action.payload.message,
    loading: false
  }),
  [LOAD_LOGS_REQUEST]: state => ({
    ...state,
    loadError: null,
    loading: true
  }),
  [LOAD_LOGS_SUCCESS]: (state, action) => {
    const logs = action.payload.map(formatLog);
    return {
      ...state,
      loadError: null,
      loading: false,
      logs
    };
  }
}, initialState);

export {
  initialState,
  reducer as default
};
