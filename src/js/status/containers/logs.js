import LogsComponent from '../components/logs.jsx';
import { connect } from 'react-redux';
import loadLogs from '../utils/load-logs';

const mapDispatchToProps = dispatch => ({
  handleReloadClick: () => {
    loadLogs(dispatch);
  }
});

const Logs = connect(state => state, mapDispatchToProps)(LogsComponent);

export default Logs;
