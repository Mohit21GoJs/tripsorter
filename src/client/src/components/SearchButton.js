import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

function SearchButton() {
  return (
    <Button variant="contained" color="primary">
      <SearchIcon />
      Search
    </Button>
  );
}

export default SearchButton;
