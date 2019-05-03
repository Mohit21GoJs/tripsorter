import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import UpdateIcon from '@material-ui/icons/Update';

function ResetButton(props) {
  const { handleClick } = props;
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      onClick={handleClick}
    >
      <UpdateIcon />
      Reset
    </Button>
  );
}

export default ResetButton;
