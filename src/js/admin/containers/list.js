import ListComponent from '../components/list.jsx';
import { connect } from 'react-redux';
import { loadEventsRequest } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleReloadClick: () => {
    dispatch(loadEventsRequest());
  }
});

const Logs = connect(state => state, mapDispatchToProps)(ListComponent);

export default Logs;
