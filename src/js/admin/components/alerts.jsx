import Alert from './alert.jsx';
import PropTypes from 'prop-types';
import React from 'react';

const Alerts = ({ alerts, handleDismiss }) => alerts.map(alert => (
  <Alert
    key={alert.id}
    onDismiss={handleDismiss}
    {...alert}
  >
    {alert.message}
  </Alert>
));

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })),
  handleDismiss: PropTypes.func.isRequired
};

Alerts.defaultProps = { alerts: [] };

export default Alerts;
