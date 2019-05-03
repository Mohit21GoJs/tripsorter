import { map, uniq, flow, sortBy } from 'lodash';
import faresData from '@modules/trips/data/fares.json';

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
const getUniqueDepatureCities = flow(
  getDepartureCities,
  uniq,
  sortBy,
);

// composition of the applied functions - which extracts uniq and then sorts
const getUniqueArrivalCities = flow(
  getArrivalCities,
  uniq,
  sortBy,
);

/**
 * City Lookup handler
 * @param {Object} req - Eventemitter req stream
 * @param {Object} res - Eventemitter res stream
 * @param {Function} next - next callback in middleware chain
 */
export const CityLookup = async (req, res, next) => {
  const { deals } = faresData;

  res.send({
    arrivalCities: getUniqueArrivalCities(deals),
    departureCities: getUniqueDepatureCities(deals),
  });
  next();
};

export default {
  CityLookup,
};
