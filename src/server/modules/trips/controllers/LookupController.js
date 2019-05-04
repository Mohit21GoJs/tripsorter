import faresData from '@modules/trips/data/fares.json';
import {
  getUniqueArrivalCities,
  getUniqueDepatureCities,
} from '@modules/trips/helpers/City';
import BaseController from '@modules/trips/controllers/BaseController';

/**
 * City Lookup handler
 * @param {Object} req - Eventemitter req stream
 * @param {Object} res - Eventemitter res stream
 * @param {Function} next - next callback in middleware chain
 */

export const CityLookup = BaseController(() => {
  const { deals } = faresData;
  return {
    arrivalCities: getUniqueArrivalCities(deals),
    departureCities: getUniqueDepatureCities(deals),
  };
});

export default {
  CityLookup,
};
