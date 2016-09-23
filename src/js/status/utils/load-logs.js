import { loadLog } from '../actions';
import { logNames } from '../../utils/constant';

const loadLogs = dispatch => logNames.forEach(logName => dispatch(loadLog(logName)));

export default loadLogs;
