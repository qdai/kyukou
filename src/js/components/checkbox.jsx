import React, { Component, PropTypes } from 'react';

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
        <span
          aria-hidden="true"
          className={isSelected ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'}
        />
        <input
          checked={isSelected}
          id={value}
          onChange={this.handleClick}
          type="checkbox"
          value={value}
        />
        <label htmlFor={value}>{value}</label>
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
