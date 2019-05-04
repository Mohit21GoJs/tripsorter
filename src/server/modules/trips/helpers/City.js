import { uniq, flow, sortBy } from 'lodash';
import {
  getDepartureCities,
  getArrivalCities,
} from '@modules/trips/utils/city';

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
