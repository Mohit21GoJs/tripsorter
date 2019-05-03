import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import DealDetailBox from './DealDetailBox';
import DealTotalBox from './DealTotalBox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const calculateTotalMinutes = memoize((deals = []) =>
  deals.reduce(
    (acc, val) => acc + Number(val.duration.h) * 60 + Number(val.duration.m),
    0,
  ),
);

const timeConvert = memoize(timeInMinutes => {
  var num = timeInMinutes;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return {
    h: rhours,
    m: rminutes,
  };
});

function ListCard(props) {
  const { classes, deals, currency, totalCost } = props;
  const totalTime = timeConvert(calculateTotalMinutes(deals));
  return (
    <Card>
      <CardHeader title="Best Deal(s)" />
      <CardContent>
        <List dense className={classes.root}>
          {Array.isArray(deals) && deals.length ? (
            <React.Fragment>
              {deals.map(deal => (
                <DealDetailBox deal={deal} currency={currency} />
              ))}
              <DealTotalBox
                totalCost={totalCost}
                totalHours={totalTime.h}
                totalMinutes={totalTime.m}
                currency={currency}
              />
            </React.Fragment>
          ) : null}
        </List>
      </CardContent>
    </Card>
  );
}

ListCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCard);
