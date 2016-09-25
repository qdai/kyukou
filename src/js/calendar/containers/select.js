import SelectComponent from '../components/select.jsx';
import { connect } from 'react-redux';
import { toggleDepartment } from '../actions';

const mapDispatchToProps = dispatch => ({
  handleClick: department => {
    dispatch(toggleDepartment(department));
  }
});

const Settings = connect(state => state, mapDispatchToProps)(SelectComponent);

export default Settings;
