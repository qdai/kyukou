import { DISMISS_ALERT, FETCH_API_COMPLETE, LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS } from './action-types';
import { CALL_API } from 'redux-api-middleware';
import { createAction } from 'redux-actions';
import { siteUrl } from '../utils/constant';

export const dismissAlert = createAction(DISMISS_ALERT);
export const fetchApiComplete = createAction(FETCH_API_COMPLETE);
export const loadEvents = () => ({
  [CALL_API]: {
    endpoint: `${siteUrl}/api/1/events/list.json`,
    method: 'GET',
    types: [LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE]
  }
});
