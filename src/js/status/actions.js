import { LOAD_LOGS_FAILURE, LOAD_LOGS_REQUEST, LOAD_LOGS_SUCCESS } from './action-types';
import { createAction } from 'redux-actions';

const loadLogsFailure = createAction(LOAD_LOGS_FAILURE);
const loadLogsRequest = createAction(LOAD_LOGS_REQUEST);
const loadLogsSuccess = createAction(LOAD_LOGS_SUCCESS);

export {
  loadLogsFailure,
  loadLogsRequest,
  loadLogsSuccess
};
