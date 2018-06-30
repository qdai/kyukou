import { LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, TOGGLE_ABOUT, TOGGLE_DEPARTMENT } from './action-types';
import { createAction } from 'redux-actions';

const loadEventsRequest = createAction(LOAD_EVENTS_REQUEST);
const loadEventsFailure = createAction(LOAD_EVENTS_FAILURE);
const loadEventsSuccess = createAction(LOAD_EVENTS_SUCCESS);
const toggleAbout = createAction(TOGGLE_ABOUT);
const toggleDepartment = createAction(TOGGLE_DEPARTMENT);

export {
  loadEventsRequest,
  loadEventsFailure,
  loadEventsSuccess,
  toggleAbout,
  toggleDepartment
};
