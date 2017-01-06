import LogsComponent from '../components/logs.jsx';
import { connect } from 'react-redux';
import { loadLogsRequest } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleReloadClick: () => {
    dispatch(loadLogsRequest());
  }
});

const Logs = connect(state => state, mapDispatchToProps)(LogsComponent);

export default Logs;
