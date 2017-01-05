import { LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, TOGGLE_ABOUT, TOGGLE_DEPARTMENT } from './action-types';
import { abouts, departments } from '../utils/constant';
import formatEvent from './utils/format-event';
import { handleActions } from 'redux-actions';
import { default as toggle } from '../utils/toggle-array-item';

export const initialState = {
  events: [],
  loadError: null,
  loading: false,
  selectedAbouts: abouts,
  selectedDepartments: departments
};

const reducer = handleActions({
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
  }),
  [TOGGLE_ABOUT]: (state, action) => {
    const selectedAbouts = toggle(state.selectedAbouts, action.payload);
    return Object.assign({}, state, { selectedAbouts });
  },
  [TOGGLE_DEPARTMENT]: (state, action) => {
    const selectedDepartments = toggle(state.selectedDepartments, action.payload);
    return Object.assign({}, state, { selectedDepartments });
  }
}, initialState);

export default reducer;
