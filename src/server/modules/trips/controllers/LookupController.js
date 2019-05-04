import faresData from '@modules/trips/data/fares.json';
import {
  getUniqueArrivalCities,
  getUniqueDepatureCities,
} from '@modules/trips/helpers/City';

/**
 * City Lookup handler
 * @param {Object} req - Eventemitter req stream
 * @param {Object} res - Eventemitter res stream
 * @param {Function} next - next callback in middleware chain
 */
export const CityLookup = async (_, res, next) => {
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
