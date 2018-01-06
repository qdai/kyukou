import Panel from 'react-bootstrap/es/Panel';
import PropTypes from 'prop-types';
import React from 'react';

const Log = ({ elapsedTime, level, log, name, time }) => (
  <Panel
    bsStyle={level}
    defaultExpanded={level !== 'success'}
  >
    <Panel.Heading>
      <Panel.Title
        componentClass="h2"
        toggle
      >
        {`${name} (${elapsedTime} ms) `}
        <time>
          {time}
        </time>
      </Panel.Title>
    </Panel.Heading>
    <Panel.Collapse>
      <Panel.Body>
        <pre>
          {log}
        </pre>
      </Panel.Body>
    </Panel.Collapse>
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
