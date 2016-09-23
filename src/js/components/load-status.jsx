import React, { PropTypes } from 'react';

const LoadStatus = ({ loadError, loading, onReload }) => {
  if (loading) {
    return (
      <div
        className="alert alert-info"
        role="alert"
      >
        <p className="lead">{'Now loading...'}</p>
      </div>
    );
  }
  if (loadError) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
      >
        <p className="lead">
          {`Load error (${loadError}). Please `}
          <a
            onClick={onReload}
            role="button"
          >
            {'load again'}
          </a>
          {'.'}
        </p>
      </div>
    );
  }
  return null;
};

LoadStatus.propTypes = {
  loadError: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onReload: PropTypes.func.isRequired
};

export default LoadStatus;
