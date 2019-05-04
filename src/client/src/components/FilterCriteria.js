import React from 'react';
import PropTypes from 'prop-types';
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

FilterCriteria.propTypes = {
  filterLabel: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterCriteria;
