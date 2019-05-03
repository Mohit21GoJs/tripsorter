import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar';
import SelectBox from './components/SelectBox';
import FilterCriteria from './components/FilterCriteria';
import SearchButton from './components/SearchButton';
import ListCard from './components/ListCard';
import ResetButton from './components/ResetButton';

// @TODO: from-to cannot be same so disable
function App() {
  return (
    <div className="App">
      <AppBar
        appTitle="TripSorter"
        navigateToGithub={() => (window.location = 'https://google.com')}
      />
      <SelectBox
        data={[{ value: 1, displayText: 21 }]}
        value={1}
        handleChange={() => alert('hello')}
      />
      <SelectBox
        data={[{ value: 1, displayText: 21 }]}
        value={1}
        handleChange={() => alert('hello')}
      />
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
      <SearchButton />
      <ResetButton />
      <ListCard />
    </div>
  );
}

export default App;
