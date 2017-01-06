import { LOAD_LOGS_FAILURE, LOAD_LOGS_REQUEST, LOAD_LOGS_SUCCESS } from './action-types';
import { createAction } from 'redux-actions';

export const loadLogsRequest = createAction(LOAD_LOGS_REQUEST);
export const loadLogsFailure = createAction(LOAD_LOGS_FAILURE);
export const loadLogsSuccess = createAction(LOAD_LOGS_SUCCESS);
