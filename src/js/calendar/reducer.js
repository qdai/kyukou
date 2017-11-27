import { TOGGLE_DEPARTMENT } from './action-types';
import { handleActions } from 'redux-actions';
import toggle from '../utils/toggle-array-item';

const initialState = { selectedDepartments: [] };

const reducer = handleActions({
  [TOGGLE_DEPARTMENT]: (state, action) => {
    const selectedDepartments = toggle(state.selectedDepartments, action.payload);
    return Object.assign({}, state, { selectedDepartments });
  }
}, initialState);

export {
  initialState,
  reducer as default
};
