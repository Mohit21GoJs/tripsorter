import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import AppBar from './components/AppBar';
import ListCard from './components/ListCard';
import ResetButton from './components/ResetButton';
import SearchComponent from './components/SearchComponent';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee ',
    height: '100vh',
  },
  content: {
    paddingTop: '2vh',
    paddingLeft: '2vw',
  },
});
// @TODO: from-to cannot be same so disable
class App extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          appTitle="TripSorter"
          navigateToGithub={() => (window.location = 'https://google.com')}
        />
        <Grid className={classes.content} container>
          <Grid item xs={12} sm={4}>
            <SearchComponent />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ResetButton />
            <ListCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
