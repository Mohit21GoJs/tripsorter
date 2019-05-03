import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CarIcon from '@material-ui/icons/DirectionsCar';
import BusIcon from '@material-ui/icons/DirectionsBus';
import TrainIcon from '@material-ui/icons/DirectionsRailway';
// import EuroIcon from './EuroIcon';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    marginTop: '10px',
    backgroundColor: '#eeeeee ',
  },
});

const iconTypeMap = {
  bus: BusIcon,
  car: CarIcon,
  train: TrainIcon,
};

function DealDetailBox(props) {
  const { deal, classes, currency } = props;
  const IconComponent = iconTypeMap[deal.transport];
  return (
    <ListItem key={deal.reference} className={classes.root}>
      <ListItemAvatar>
        <IconComponent />
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="subtitle1" gutterBottom>{`${deal.departure} > ${
          deal.arrival
        }`}</Typography>
        <Typography variant="subtitle2" gutterBottom>{`${deal.transport}  ${
          deal.reference
        } for ${deal.duration.h}h ${deal.duration.m}`}</Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <Typography variant="subtitle1" gutterBottom>
          {`${deal.cost - (deal.discount * deal.cost) / 100} ${currency}`}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default withStyles(styles)(DealDetailBox);
