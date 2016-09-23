import { abouts } from '../../utils/constant';

const filterEvents = (events, selectedAbouts, selectedDepartments) => events.filter(event => {
  const isUnknownAbout = abouts.indexOf(event.about) === -1;
  const etcSelected = selectedAbouts.indexOf(abouts[abouts.length - 1]) >= 0;
  const isSelectedAbout = selectedAbouts.length === 0 || selectedAbouts.indexOf(event.about) >= 0;
  const isSelectedDepartment = selectedDepartments.length === 0 || selectedDepartments.indexOf(event.department.substr(0, event.department.lastIndexOf('部') + 1)) >= 0;
  return ((isUnknownAbout && etcSelected) || isSelectedAbout) && isSelectedDepartment;
});

export default filterEvents;
