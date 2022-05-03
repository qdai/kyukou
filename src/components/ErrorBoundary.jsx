import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static getDerivedStateFromError (err) {
    return {
      hasError: true,
      message: err.message
    };
  }

  constructor (props) {
    super(props);
    this.state = {
      hasError: false,
      message: null
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { hasError, message } = this.state;
    if (hasError !== nextState.hasError && message !== nextState.message) {
      return true;
    }
    return false;
  }

  render () {
    const { children } = this.props;
    const { hasError, message } = this.state;
    if (hasError) {
      return (
        <div>
          <h1>
            {'エラー'}
          </h1>
          <p>
            {message}
          </p>
        </div>
      );
    }
    return children;
  }
}

// eslint-disable-next-line react/static-property-placement
ErrorBoundary.propTypes = { children: PropTypes.node.isRequired };

export default ErrorBoundary;
