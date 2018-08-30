import React, { Fragment } from 'react';
import LoadStatus from '../../components/load-status.jsx';
import PropTypes from 'prop-types';
import { eventKeys } from '../../utils/constant';

const List = ({ events, handleReloadClick, loadError, loading }) => (
  <Fragment>
    <h2 className="sr-only">
      {'List'}
    </h2>
    <LoadStatus
      loadError={loadError}
      loading={loading}
      onReload={handleReloadClick}
    />
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          {eventKeys.map(key => (
            <th key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.hash}>
            {eventKeys.map(key => (
              <td key={key}>
                {event[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </Fragment>
);

List.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape(eventKeys.reduce((obj, key) => {
    obj[key] = PropTypes.string;
    return obj;
  }, {})).isRequired).isRequired,
  handleReloadClick: PropTypes.func.isRequired,
  loadError: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

List.defaultProps = { loadError: null };

export default List;
