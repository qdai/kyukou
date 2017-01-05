import { DISMISS_ALERT, FETCH_API_COMPLETE, LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS } from './action-types';
import formatEvent from './utils/format-event';
import { handleActions } from 'redux-actions';

export const initialState = {
  alerts: [],
  events: [],
  loadError: null,
  loading: false
};

const reducer = handleActions({
  [DISMISS_ALERT]: (state, action) => {
    const alerts = [...state.alerts].filter(alert => alert.id !== action.payload);
    return Object.assign({}, state, { alerts });
  },
  [FETCH_API_COMPLETE]: (state, action) => {
    const alert = Object.assign({ id: new Date().getTime() }, action.payload);
    const alerts = [...state.alerts, alert];
    return Object.assign({}, state, { alerts });
  },
  [LOAD_EVENTS_FAILURE]: (state, action) => Object.assign({}, state, {
    loadError: action.payload.message,
    loading: false
  }),
  [LOAD_EVENTS_REQUEST]: state => Object.assign({}, state, {
    loadError: null,
    loading: true
  }),
  [LOAD_EVENTS_SUCCESS]: (state, action) => Object.assign({}, state, {
    events: action.payload.map(formatEvent),
    loadError: null,
    loading: false
  })
}, initialState);

export default reducer;
