import React, { Fragment } from 'react';
import Alert from './alert.jsx';
import PropTypes from 'prop-types';

const Alerts = ({ alerts, handleDismiss }) => (
  <Fragment>
    {alerts.map(alert => (
      <Alert
        key={alert.id}
        onDismiss={handleDismiss}
        {...alert}
      >
        {alert.message}
      </Alert>
    ))}
  </Fragment>
);

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
