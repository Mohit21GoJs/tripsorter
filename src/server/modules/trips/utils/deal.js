import {
  calculateCostWithDiscount,
  calculateTimeInMinutes,
} from '@modules/trips/utils';
/**
 * Make unique deal key from deal object
 * @param {Object} deal
 * @returns {string}
 */
export const makeUniqueDealKey = deal =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `${deal.departure}_${deal.arrival}_${deal.transport}`;

/**
 * Normalize deals for faster search  as Object lookup O(1)
 * @param {Array} deals
 * @returns {Object}
 */
export const normalizeDeals = deals =>
  Array.isArray(deals) &&
  deals.reduce(
    (acc, val) => ({
      ...acc,
      [makeUniqueDealKey(val)]: {
        ...val,
      },
    }),
    {},
  );

/**
 * Calculate total time for deals
 * @param {Array} deals
 * @returns {Object}
 */
export const calculateTotalTimeForDeal = deals =>
  Array.isArray(deals) &&
  deals.reduce(
    (acc, val) => acc + calculateTimeInMinutes(val.duration.h, val.duration.m),
    0,
  );

/**
 * Calculate total cost for deals
 * @param {Array} deals
 * @returns {Object}
 */
export const calculateTotalCostForDeal = deals =>
  Array.isArray(deals) &&
  deals.reduce(
    (acc, val) => acc + calculateCostWithDiscount(val.cost, val.discount),
    0,
  );

export default {
  makeUniqueDealKey,
  normalizeDeals,
  calculateTotalTimeForDeal,
  calculateTotalCostForDeal,
};
