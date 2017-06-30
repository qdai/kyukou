import EventsOfADay, { propTypes as EventsOfADayPropTypes } from './events-of-a-day.jsx';
import LoadStatus from '../../components/load-status.jsx';
import PropTypes from 'prop-types';
import React from 'react';

const Events = ({ count, events, handleReloadClick, loadError, loading, selectedAbouts, selectedDepartments }) => {
  const countNode = <p className="events-count">{`表示中：${count}`}</p>;
  if (loading || loadError) {
    return (
      <LoadStatus
        loadError={loadError}
        loading={loading}
        onReload={handleReloadClick}
      />
    );
  }
  if (events.length === 0) {
    return (
      <div>
        {countNode}
        <p>{`${selectedDepartments.join('、')}の${selectedAbouts.join('、')}に関する情報はありません。`}</p>
      </div>
    );
  }
  return (
    <div className="events">
      {countNode}
      <div className="events-list">
        {events.map(e => (
          <EventsOfADay
            key={e.date}
            {...e}
          />
        ))}
      </div>
    </div>
  );
};

Events.propTypes = {
  count: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape(EventsOfADayPropTypes)).isRequired,
  handleReloadClick: PropTypes.func.isRequired,
  loadError: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  selectedAbouts: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDepartments: PropTypes.arrayOf(PropTypes.string).isRequired
};

Events.defaultProps = { loadError: null };

export default Events;
