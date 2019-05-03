import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

function SelectBox(props) {
  const { value, handleChange, data, classes, id, name, labelText } = props;
  return (
    <FormControl className={classes.root}>
      <InputLabel htmlFor={id}>{labelText}</InputLabel>
      <Select
        autoWidth={false}
        value={value}
        onChange={handleChange}
        inputProps={{
          name,
          id,
        }}
      >
        {Array.isArray(data) &&
          data.length &&
          data.map(val => (
            <MenuItem key={val.value} value={val.value}>
              {val.displayText}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default withStyles(styles)(SelectBox);
