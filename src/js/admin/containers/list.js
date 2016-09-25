import ListComponent from '../components/list.jsx';
import { connect } from 'react-redux';
import { loadEvents } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleReloadClick: () => {
    dispatch(loadEvents());
  }
});

const Logs = connect(state => state, mapDispatchToProps)(ListComponent);

export default Logs;
