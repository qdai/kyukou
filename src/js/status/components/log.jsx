import Panel from 'react-bootstrap/es/Panel';
import PropTypes from 'prop-types';
import React from 'react';

const Log = ({ elapsedTime, level, log, name, time }) => (
  <Panel
    bsStyle={level}
    collapsible
    defaultExpanded={level !== 'success'}
    header={
      <h2>
        {`${name} (${elapsedTime} ms) `}
        <time>{time}</time>
      </h2>
    }
  >
    <pre>{log}</pre>
  </Panel>
);

Log.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  log: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

export default Log;
