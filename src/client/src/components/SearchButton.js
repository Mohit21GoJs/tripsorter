import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

function SearchButton(props) {
  const { handleClick } = props;
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      onClick={handleClick}
    >
      <SearchIcon />
      Search
    </Button>
  );
}

export default SearchButton;
