import { departments, departmentsEnShort, site } from '../../constant';

const baseURL = `${site.url}/kyukou.ics`;
const serialize = department => departmentsEnShort[departments.indexOf(department)];

const createCalendarURL = selectedDepartments => {
  const query = selectedDepartments.sort().map(department => `departments[]=${serialize(department)}`);
  return query.length === 0 ? baseURL : `${baseURL}?${query.join('&')}`;
};

export default createCalendarURL;
