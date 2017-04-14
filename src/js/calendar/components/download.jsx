import PropTypes from 'prop-types';
import React from 'react';

const Download = ({ link }) =>
  <div>
    <h2 className="h3">{'Download'}</h2>
    <p>
      <a
        className="btn btn-primary btn-lg"
        href={link}
      >
        {'Get iCalendar'}
      </a>
    </p>
    <p>{'URL: '}
      <a href={link}>{link}</a>
    </p>
  </div>;

Download.propTypes = { link: PropTypes.string.isRequired };

export default Download;
