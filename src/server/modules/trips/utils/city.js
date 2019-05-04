import { map } from 'lodash';
/**
 * Curried base function(HOF) to include common logic
 * @param {string} typeOfCity
 * @returns {Function}
 */
const getCitiesFromDeals = typeOfCity => deals => map(deals, typeOfCity);

/**
 * Function for getting departure city from deals, reverse mapping
 */
export const getDepartureCities = getCitiesFromDeals('departure');

/**
 * Function for getting arrival city from deals, reverse mapping
 */
export const getArrivalCities = getCitiesFromDeals('arrival');

export default {
  getDepartureCities,
  getArrivalCities,
};
