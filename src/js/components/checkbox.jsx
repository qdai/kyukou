import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor (...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate (nextProps) {
    return this.props.isSelected !== nextProps.isSelected;
  }

  handleClick () {
    this.props.onClick(this.props.value);
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
