import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Download = ({ link }) => (
  <Fragment>
    <h2 className="h3">
      {'Download'}
    </h2>
    <p>
      <a
        className="btn btn-primary btn-lg"
        href={link}
      >
        {'Get iCalendar'}
      </a>
    </p>
    <p>
      {'URL: '}
      <a href={link}>
        {link}
      </a>
    </p>
  </Fragment>
);

Download.propTypes = { link: PropTypes.string.isRequired };

export default Download;
