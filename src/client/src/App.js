import React from 'react';
import memoize from 'memoize-one';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import AppBar from './components/AppBar';
import ListCard from './components/ListCard';
import SearchComponent from './components/SearchComponent';
import { getData, postData } from './helpers/api';

const styles = _ => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    height: '100vh',
  },
  content: {
    paddingTop: '2vh',
    paddingLeft: '2vw',
  },
});
// @TODO: from-to cannot be same so disable

const initialSearchPreferences = Object.freeze({
  arrivalCity: '',
  departureCity: '',
  cheapest: true,
  quickest: false,
});
class App extends React.PureComponent {
  state = {
    arrivalCities: [],
    departureCities: [],
    searchPreferences: { ...initialSearchPreferences },
    deals: [],
    currency: '',
    totalCost: '',
  };

  clearOtherFilter = key => value =>
    this.setState(prevState => ({
      searchPreferences: {
        ...prevState.searchPreferences,
        [key]: !value,
      },
    }));

  filterCities = memoize((cities, cityToBeRemoved) =>
    cities.filter(val => val.value !== cityToBeRemoved),
  );

  searchPreferenceHandler = (key, cb) => value => {
    if (cb && typeof cb === 'function') {
      cb.call(this, value);
    }
    this.setState(prevState => ({
      searchPreferences: {
        ...prevState.searchPreferences,
        [key]: value,
      },
    }));
  };

  searchHandler = () => {
    const { searchPreferences } = this.state;
    const reqBody = {
      source: searchPreferences.departureCity,
      destination: searchPreferences.arrivalCity,
      cheapest: searchPreferences.cheapest,
      quickest: searchPreferences.quickest,
    };
    this.setState({ loadingDeals: true });
    postData('trips/search', reqBody).then(data => {
      if (data) {
        const { deals, currency, totalCost } = data;
        this.setState({
          deals,
          currency,
          totalCost,
          loadingDeals: false,
        });
      }
    });
  };

  resetSearchHandler = () =>
    this.setState({
      searchPreferences: { ...initialSearchPreferences },
      deals: [],
      currency: '',
      totalCost: '',
    });x

  checkSearchBtnDisabled = () =>
    !this.state.searchPreferences.arrivalCity ||
    !this.state.searchPreferences.departureCity ||
    this.state.loadingDeals;

  checkResetBtnDisabled = () => this.state.loadingDeals;

  componentDidMount() {
    getData('trips/cities')
      .then(data => {
        if (data) {
          this.setState({
            arrivalCities:
              data.arrivalCities && Array.isArray(data.arrivalCities)
                ? data.arrivalCities.map(val => ({
                    value: val,
                    displayText: val,
                  }))
                : [],
            departureCities:
              data.departureCities && Array.isArray(data.departureCities)
                ? data.arrivalCities.map(val => ({
                    value: val,
                    displayText: val,
                  }))
                : [],
          });
        }
      })
      .catch(console.info);
  }

  render() {
    const { classes } = this.props;
    const {
      arrivalCities,
      departureCities,
      deals,
      currency,
      totalCost,
      searchPreferences: {
        arrivalCity: selectedArrivalCity,
        departureCity: selectedDepartureCity,
        cheapest: isCheapestSelected,
        quickest: isQuickestSelected,
      },
    } = this.state;
    const filteredArrivalCities = this.filterCities(
      arrivalCities,
      selectedDepartureCity,
    );
    const filteredDepartureCities = this.filterCities(
      departureCities,
      selectedArrivalCity,
    );
    return (
      <div className={classes.root}>
        <AppBar
          appTitle="TripSorter"
          navigateToGithub={() => (window.location = 'https://google.com')}
        />
        <Grid className={classes.content} spacing={100} container>
          <Grid item xs={12} sm={4}>
            <SearchComponent
              arrivalCities={filteredArrivalCities}
              departureCities={filteredDepartureCities}
              selectedArrivalCity={selectedArrivalCity}
              selectedDepartureCity={selectedDepartureCity}
              isQuickestSelected={isQuickestSelected}
              isCheapestSelected={isCheapestSelected}
              searchHandler={this.searchHandler}
              resetHandler={this.resetSearchHandler}
              isSeachBtnDisabled={this.checkSearchBtnDisabled()}
              isResetBtnDisabled={this.checkResetBtnDisabled()}
              arrivalCityHandler={this.searchPreferenceHandler('arrivalCity')}
              departureCityHandler={this.searchPreferenceHandler(
                'departureCity',
              )}
              cheapestFilterHandler={this.searchPreferenceHandler(
                'cheapest',
                this.clearOtherFilter('quickest'),
              )}
              quickestFilterHandler={this.searchPreferenceHandler(
                'quickest',
                this.clearOtherFilter('cheapest'),
              )}
            />
          </Grid>
          <Grid item sm={1} />
          <Grid item xs={12} sm={6}>
            <ListCard
              isLoadingDeals={this.state.loadingDeals}
              deals={deals}
              totalCost={totalCost}
              currency={currency}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
