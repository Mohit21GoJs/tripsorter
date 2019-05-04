import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import UpdateIcon from '@material-ui/icons/Update';

const styles = theme => ({
  root: {
    minWidth: '90%',
  },
});
function ResetButton(props) {
  const { handleClick, classes } = props;
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      onClick={handleClick}
      className={classes.root}
    >
      <UpdateIcon />
      Reset
    </Button>
  );
}

ResetButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetButton);
