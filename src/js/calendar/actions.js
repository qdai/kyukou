import { TOGGLE_DEPARTMENT } from './action-types';
import { createAction } from 'redux-actions';

export const toggleDepartment = createAction(TOGGLE_DEPARTMENT); // eslint-disable-line import/prefer-default-export
