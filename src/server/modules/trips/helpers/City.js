import { map, uniq, flow, sortBy } from 'lodash';

/**
 * Curried base function(HOF) to include common logic
 * @param {string} typeOfCity
 * @returns {Function}
 */
const getCitieFromDeals = typeOfCity => deals => map(deals, typeOfCity);

/**
 * Function for getting departure city from deals, reverse mapping
 */
const getDepartureCities = getCitieFromDeals('departure');

/**
 * Function for getting arrival city from deals, reverse mapping
 */
const getArrivalCities = getCitieFromDeals('arrival');

// composition of the applied functions - which extracts uniq and then sorts
export const getUniqueDepatureCities = flow(
  getDepartureCities,
  uniq,
  sortBy,
);

// composition of the applied functions - which extracts uniq and then sorts
export const getUniqueArrivalCities = flow(
  getArrivalCities,
  uniq,
  sortBy,
);

export default {
  getUniqueDepatureCities,
  getUniqueArrivalCities,
};
