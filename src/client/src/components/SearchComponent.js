import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SelectBox from './SelectBox';
import FilterCriteria from './FilterCriteria';
import SearchButton from './SearchButton';

const styles = _ => ({
  root: {
    padding: '2vh',
  },
  searchDropDowns: {
    minWidth: '20px',
  },
});

function SearchComponent(props) {
  const { classes } = props;
  return (
    <Card className={classes.root}>
      <CardHeader title="Search Options" />
      <CardContent>
        <Grid container spacing={90} alignItems="center">
          <Grid item xs={12}>
            <SelectBox
              id="source"
              name="source"
              labelText="Select Source"
              data={[{ value: 1, displayText: 21 }]}
              value={1}
              handleChange={() => alert('hello')}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectBox
              id="destination"
              name="destination"
              labelText="Select Destination"
              data={[{ value: 1, displayText: 21 }]}
              value={1}
              handleChange={() => alert('hello')}
            />
          </Grid>

          <Grid item xs={12}>
            <FilterCriteria
              checkedValue={1}
              filterValues={[
                {
                  value: 1,
                  displayText: 'Cheapest',
                },
                {
                  value: 2,
                  displayText: 'Fastest',
                },
              ]}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item xs={24} spacing={90}>
            <SearchButton />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(SearchComponent);
