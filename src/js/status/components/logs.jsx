import Log, { propTypes as LogPropTypes } from './log.jsx';
import React, { PropTypes } from 'react';
import LoadStatus from '../../components/load-status.jsx';

const Logs = ({ handleReloadClick, loadError, loading, logs }) =>
  <div className="panel-group">
    <LoadStatus
      loadError={loadError}
      loading={loading}
      onReload={handleReloadClick}
    />
    {logs.map(log =>
      <Log
        key={log.name}
        {...log}
      />
    )}
  </div>;

Logs.propTypes = {
  handleReloadClick: PropTypes.func.isRequired,
  loadError: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  logs: PropTypes.arrayOf(PropTypes.shape(LogPropTypes)).isRequired
};

Logs.defaultProps = { loadError: null };

export default Logs;
