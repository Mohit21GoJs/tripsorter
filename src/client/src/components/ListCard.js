import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ListCard(props) {
  const { classes, deals } = props;
  return (
    <List dense className={classes.root}>
      {Array.isArray(deals) &&
        deals.length &&
        deals.map(value => (
          <ListItem key={value} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction />
          </ListItem>
        ))}
    </List>
  );
}

ListCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCard);
