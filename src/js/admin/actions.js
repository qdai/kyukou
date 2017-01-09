import { DISMISS_ALERT, FETCH_API_COMPLETE, FETCH_API_REQUEST, LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS } from './action-types';
import { createAction } from 'redux-actions';

export const dismissAlert = createAction(DISMISS_ALERT);
export const fetchApiComplete = createAction(FETCH_API_COMPLETE);
export const fetchApiRequest = createAction(FETCH_API_REQUEST);
export const loadEventsRequest = createAction(LOAD_EVENTS_REQUEST);
export const loadEventsFailure = createAction(LOAD_EVENTS_FAILURE);
export const loadEventsSuccess = createAction(LOAD_EVENTS_SUCCESS);
