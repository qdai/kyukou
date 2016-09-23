import React, { Component, PropTypes } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

class Alert extends Component {
  constructor (...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
  }
  shouldComponentUpdate (nextProps) {
    return this.props.message !== nextProps.message;
  }
  handleClick () {
    this.props.onDismiss(this.props.id);
  }
  render () {
    const { message, type } = this.props;
    return (
      <BootstrapAlert
        bsStyle={type}
        onDismiss={this.handleClick}
      >
        {message}
      </BootstrapAlert>
    );
  }
}

Alert.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Alert;
