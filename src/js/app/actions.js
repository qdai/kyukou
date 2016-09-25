import { LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, TOGGLE_ABOUT, TOGGLE_DEPARTMENT } from './action-types';
import { CALL_API } from 'redux-api-middleware';
import { createAction } from 'redux-actions';
import { siteUrl } from '../utils/constant';

export const loadEvents = () => ({
  [CALL_API]: {
    endpoint: `${siteUrl}/api/1/events/list.json`,
    method: 'GET',
    types: [LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE]
  }
});
export const toggleAbout = createAction(TOGGLE_ABOUT);
export const toggleDepartment = createAction(TOGGLE_DEPARTMENT);
