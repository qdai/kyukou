import { LOAD_LOG_FAILURE, LOAD_LOG_REQUEST, LOAD_LOG_SUCCESS } from './action-types';
import { CALL_API } from 'redux-api-middleware';
import { siteUrl } from '../utils/constant';

export const loadLog = logName => ({
  [CALL_API]: {
    endpoint: `${siteUrl}/api/1/logs/${logName}.json`,
    method: 'GET',
    types: [LOAD_LOG_REQUEST, LOAD_LOG_SUCCESS, LOAD_LOG_FAILURE]
  }
});
