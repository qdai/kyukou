import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor (...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate (nextProps) {
    const { isSelected } = this.props;
    return isSelected !== nextProps.isSelected;
  }

  handleClick () {
    const { onClick, value } = this.props;
    onClick(value);
  }

  render () {
    const { isSelected, value } = this.props;
    return (
      <span className="component-checkbox">
        <input
          checked={isSelected}
          id={value}
          onChange={this.handleClick}
          type="checkbox"
          value={value}
        />
        <label htmlFor={value}>
          <svg className="icon">
            <use xlinkHref={isSelected ? '#icon-checkbox-checked' : '#icon-checkbox-unchecked'} />
          </svg>
          {value}
        </label>
      </span>
    );
  }
}

Checkbox.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Checkbox;
