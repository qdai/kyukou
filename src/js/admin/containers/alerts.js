import AlertsComponent from '../components/alerts.jsx';
import { connect } from 'react-redux';
import { dismissAlert } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleDismiss: id => {
    dispatch(dismissAlert(id));
  }
});

const Alerts = connect(state => state, mapDispatchToProps)(AlertsComponent);

export default Alerts;
