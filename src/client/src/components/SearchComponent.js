import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SelectBox from './SelectBox';
import FilterCriteria from './FilterCriteria';
import SearchButton from './SearchButton';
import ResetButton from './ResetButton';

const styles = _ => ({
  root: {
    padding: '2vh',
  },
  searchDropDowns: {
    minWidth: '20px',
  },
});

function SearchComponent(props) {
  const {
    classes,
    arrivalCities,
    departureCities,
    selectedArrivalCity,
    selectedDepartureCity,
    isQuickestSelected,
    isCheapestSelected,
    arrivalCityHandler,
    departureCityHandler,
    cheapestFilterHandler,
    quickestFilterHandler,
    searchHandler,
    resetHandler,
  } = props;
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
              data={departureCities}
              value={selectedDepartureCity}
              handleChange={departureCityHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectBox
              id="destination"
              name="destination"
              labelText="Select Destination"
              data={arrivalCities}
              value={selectedArrivalCity}
              handleChange={arrivalCityHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <FilterCriteria
              checked={isQuickestSelected}
              filterLabel="Quickest"
              handleFilterChange={quickestFilterHandler}
            />
            <FilterCriteria
              checked={isCheapestSelected}
              filterLabel="Cheapest"
              handleFilterChange={cheapestFilterHandler}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item xs={12} sm={6}>
            <SearchButton handleClick={searchHandler} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ResetButton handleClick={resetHandler} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(SearchComponent);
