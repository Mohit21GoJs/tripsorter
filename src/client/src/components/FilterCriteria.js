import React from 'react';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function FilterCriteria(props) {
  const { filterLabel, checked, handleFilterChange } = props;
  return (
    <FormControlLabel
      control={
        <Switch
          onChange={(_, checked) => handleFilterChange(checked)}
          checked={checked}
        />
      }
      label={filterLabel}
    />
  );
}

export default FilterCriteria;
