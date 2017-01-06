import Events from '../components/events.jsx';
import { connect } from 'react-redux';
import eventsOfADay from '../utils/events-of-a-day';
import filterEvents from '../utils/filter-events';
import { loadEventsRequest } from '../actions';

const mapStateToProps = state => {
  const filteredEvents = filterEvents(state.events, state.selectedAbouts, state.selectedDepartments);
  return {
    count: `${filteredEvents.length}/${state.events.length}`,
    events: eventsOfADay(filteredEvents),
    loadError: state.loadError,
    loading: state.loading,
    selectedAbouts: state.selectedAbouts,
    selectedDepartments: state.selectedDepartments
  };
};

const mapDispatchToProps = dispatch => ({
  handleReloadClick: () => {
    dispatch(loadEventsRequest());
  }
});

const VisibleEvents = connect(mapStateToProps, mapDispatchToProps)(Events);

export default VisibleEvents;
