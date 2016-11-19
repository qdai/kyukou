import { departments, departmentsEnShort, siteUrl } from '../../utils/constant';
import DownloadComponent from '../components/download.jsx';
import { connect } from 'react-redux';

const calendarUrl = `${siteUrl}/calendar/kyukou.ics`;
const serialize = department => departmentsEnShort[departments.indexOf(department)];

const mapStateToProps = state => {
  const query = state.selectedDepartments.sort().map(department => `departments[]=${serialize(department)}`);
  const link = query.length === 0 ? calendarUrl : `${calendarUrl}?${query.join('&')}`;
  return { link };
};

const Download = connect(mapStateToProps)(DownloadComponent);

export default Download;
