import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import UpdateIcon from '@material-ui/icons/Update';

function ResetButton() {
  return (
    <Button variant="contained" color="primary">
      <UpdateIcon />
      Reset
    </Button>
  );
}

export default ResetButton;
