import { toggleAbout, toggleDepartment } from '../actions';
import SettingsComponent from '../components/settings.jsx';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  handleAboutClick: about => {
    dispatch(toggleAbout(about));
  },
  handleDepartmentClick: department => {
    dispatch(toggleDepartment(department));
  }
});

const Settings = connect(state => state, mapDispatchToProps)(SettingsComponent);

export default Settings;
