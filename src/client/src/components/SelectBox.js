import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function SelectBox(props) {
  const { value, handleChange, data } = props;
  return (
    <Select autoWidth={true} value={value} onChange={handleChange}>
      {Array.isArray(data) &&
        data.length &&
        data.map(val => (
          <MenuItem key={val.value} value={val.value}>
            {val.displayText}
          </MenuItem>
        ))}
    </Select>
  );
}

export default SelectBox;
