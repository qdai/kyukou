import { LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, TOGGLE_ABOUT, TOGGLE_DEPARTMENT } from './action-types';
import { createAction } from 'redux-actions';

export const loadEventsRequest = createAction(LOAD_EVENTS_REQUEST);
export const loadEventsFailure = createAction(LOAD_EVENTS_FAILURE);
export const loadEventsSuccess = createAction(LOAD_EVENTS_SUCCESS);
export const toggleAbout = createAction(TOGGLE_ABOUT);
export const toggleDepartment = createAction(TOGGLE_DEPARTMENT);
