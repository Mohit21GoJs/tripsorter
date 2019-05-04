import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import SelectBox from './SelectBox';
import FilterCriteria from './FilterCriteria';
import SearchButton from './SearchButton';
import ResetButton from './ResetButton';

const styles = _ => ({
  root: {
    padding: '2vh',
  },
  searchDropDowns: {
    minWidth: 20,
  },
  btnSeparator: {
    height: 10,
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
    isSeachBtnDisabled,
    isResetBtnDisabled,
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
          <Grid item xs={12} md={6}>
            <SearchButton
              handleClick={searchHandler}
              passThrough={{ disabled: isSeachBtnDisabled }}
            />
            <Hidden mdUp>
              <div className={classes.btnSeparator} />
            </Hidden>
          </Grid>

          <Grid item xs={12} md={6}>
            <ResetButton
              handleClick={resetHandler}
              passThrough={{ disabled: isResetBtnDisabled }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

SearchComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  arrivalCities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  departureCities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedArrivalCity: PropTypes.string.isRequired,
  selectedDepartureCity: PropTypes.string.isRequired,
  isQuickestSelected: PropTypes.bool.isRequired,
  isCheapestSelected: PropTypes.bool.isRequired,
  arrivalCityHandler: PropTypes.func.isRequired,
  departureCityHandler: PropTypes.func.isRequired,
  cheapestFilterHandler: PropTypes.func.isRequired,
  quickestFilterHandler: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
  resetHandler: PropTypes.func.isRequired,
  isSeachBtnDisabled: PropTypes.bool.isRequired,
  isResetBtnDisabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SearchComponent);
