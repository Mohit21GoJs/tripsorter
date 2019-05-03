import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const styles = theme => ({
  root: {
    marginTop: '10px',
    backgroundColor: '#eeeeee ',
  },
});

function DealTotalBox(props) {
  const { totalMinutes, totalHours, totalCost, classes, currency } = props;
  return (
    <ListItem key="total" className={classes.root}>
      <ListItemAvatar>
        <Typography variant="subtitle1" gutterBottom>
          Total
        </Typography>
      </ListItemAvatar>
      <ListItemText>
        <Typography
          variant="subtitle1"
          gutterBottom
        >{`${totalHours}h ${totalMinutes}`}</Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <Typography variant="subtitle1" gutterBottom>
          {`${totalCost} ${currency}`}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default withStyles(styles)(DealTotalBox);
