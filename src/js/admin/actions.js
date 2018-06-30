import { DISMISS_ALERT, FETCH_API_COMPLETE, FETCH_API_REQUEST, LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS } from './action-types';
import { createAction } from 'redux-actions';

const dismissAlert = createAction(DISMISS_ALERT);
const fetchApiComplete = createAction(FETCH_API_COMPLETE);
const fetchApiRequest = createAction(FETCH_API_REQUEST);
const loadEventsRequest = createAction(LOAD_EVENTS_REQUEST);
const loadEventsFailure = createAction(LOAD_EVENTS_FAILURE);
const loadEventsSuccess = createAction(LOAD_EVENTS_SUCCESS);

export {
  dismissAlert,
  fetchApiComplete,
  fetchApiRequest,
  loadEventsRequest,
  loadEventsFailure,
  loadEventsSuccess
};
