import React, { Fragment } from 'react';
import Checkbox from '../../components/checkbox.jsx';
import PropTypes from 'prop-types';
import { departments } from '../../utils/constant';

const Select = ({ handleClick, selectedDepartments }) => (
  <Fragment>
    <h2 className="h3">
      {'Select'}
    </h2>
    {departments.map(department => (
      <Checkbox
        isSelected={selectedDepartments.indexOf(department) >= 0}
        key={department}
        onClick={handleClick}
        value={department}
      >
        {department}
      </Checkbox>
    ))}
  </Fragment>
);

Select.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selectedDepartments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Select;
