import { LOAD_EVENTS_FAILURE, LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, TOGGLE_ABOUT, TOGGLE_DEPARTMENT } from './action-types';
import { abouts, departments } from '../utils/constant';
import formatEvent from './utils/format-event';
import { handleActions } from 'redux-actions';
import toggle from '../utils/toggle-array-item';

const initialState = {
  events: [],
  loadError: null,
  loading: false,
  selectedAbouts: abouts,
  selectedDepartments: departments
};

const reducer = handleActions({
  [LOAD_EVENTS_FAILURE]: (state, action) => ({
    ...state,
    loadError: action.payload.message,
    loading: false
  }),
  [LOAD_EVENTS_REQUEST]: state => ({
    ...state,
    loadError: null,
    loading: true
  }),
  [LOAD_EVENTS_SUCCESS]: (state, action) => ({
    ...state,
    events: action.payload.map(formatEvent),
    loadError: null,
    loading: false
  }),
  [TOGGLE_ABOUT]: (state, action) => {
    const selectedAbouts = toggle(state.selectedAbouts, action.payload);
    return {
      ...state,
      selectedAbouts
    };
  },
  [TOGGLE_DEPARTMENT]: (state, action) => {
    const selectedDepartments = toggle(state.selectedDepartments, action.payload);
    return {
      ...state,
      selectedDepartments
    };
  }
}, initialState);

export {
  initialState,
  reducer as default
};
