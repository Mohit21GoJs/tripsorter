import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function LabelWithSwitch(props) {
  const { val, checkedValue } = props;
  return (
    <FormControlLabel
      control={
        <Switch value={val.value} checked={val.value === checkedValue} />
      }
      label={val.displayText}
    />
  );
}

function FilterCriteria(props) {
  const { filterValues, checkedValue } = props;
  return (
    Array.isArray(filterValues) && (
      <FormGroup row>
        {filterValues.map(val => (
          <LabelWithSwitch val={val} checkedValue={checkedValue} />
        ))}
      </FormGroup>
    )
  );
}

export default FilterCriteria;
