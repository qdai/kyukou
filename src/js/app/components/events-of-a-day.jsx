import Panel from 'react-bootstrap/es/Panel';
import PropTypes from 'prop-types';
import React from 'react';

const EventsOfADay = ({ data, date, dateFormatted }) => (
  <section>
    <h2
      className="h3"
      title={date}
    >
      {dateFormatted}
    </h2>
    <div className="panel-group">
      {data.map(event => (
        <Panel
          collapsible
          header={
            <h3 className="h4 row">
              <span className="col-sm-2 col-xs-3">{event.about}</span>
              <span className="col-sm-2 col-xs-3">{`${event.period}時限`}</span>
              <span className="col-sm-3 hidden-xs">{event.department}</span>
              <span className="col-sm-5 col-xs-6">{event.subject}</span>
            </h3>
          }
          key={event.hash}
          title={event.raw}
        >
          <ul>
            <li className="hidden-sm hidden-md hidden-lg">{event.department}</li>
            <li>{`教員：${event.teacher}`}</li>
            { event.note || event.campus || event.room ? <li>{event.note} {event.campus} {event.room}</li> : null }
          </ul>
          <p>
            <a
              href={event.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {'情報取得元'}
              <svg className="icon">
                <use xlinkHref="#icon-new-tab" />
              </svg>
            </a>
          </p>
        </Panel>
      ))}
    </div>
  </section>
);

EventsOfADay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    about: PropTypes.string.isRequired,
    campus: PropTypes.string,
    department: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    note: PropTypes.string,
    period: PropTypes.string.isRequired,
    raw: PropTypes.string.isRequired,
    room: PropTypes.string,
    subject: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired
  }).isRequired).isRequired,
  date: PropTypes.string.isRequired,
  dateFormatted: PropTypes.string.isRequired
};

export default EventsOfADay;
