import Checkbox from '../../components/checkbox.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import { departments } from '../../utils/constant';

const Select = ({ handleClick, selectedDepartments }) =>
  <div>
    <h2 className="h3">{'Select'}</h2>
    {departments.map(department =>
      <Checkbox
        isSelected={selectedDepartments.indexOf(department) >= 0}
        key={department}
        onClick={handleClick}
        value={department}
      >
        {department}
      </Checkbox>
    )}
  </div>;

Select.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selectedDepartments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Select;
