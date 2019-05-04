import { isUndefined, get } from 'lodash';
import {
  calculateCostWithDiscount,
  calculateTimeInMinutes,
} from '@modules/trips/utils';

export const extractMinFareDeals = deals =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Array.isArray(deals) &&
  deals.reduce((acc, val) => {
    const accCopy = { ...acc };
    const { departure, arrival, transport, cost, discount } = val;
    const finalCost = calculateCostWithDiscount(cost, discount);
    const key = `${departure}_${arrival}`;
    const existingCost = get(accCopy, [key, 'cost']);
    if (isUndefined(existingCost) || existingCost > finalCost) {
      accCopy[key] = {
        cost: finalCost,
        departure,
        arrival,
        transport,
      };
    }
    return accCopy;
  }, {});

export const extractQuickestDeals = deals =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Array.isArray(deals) &&
  deals.reduce((acc, val) => {
    const accCopy = { ...acc };
    const {
      departure,
      arrival,
      transport,
      duration: { h: hours, m: minutes },
    } = val;
    const finalCost = calculateTimeInMinutes(hours, minutes);
    const key = `${departure}_${arrival}`;
    const existingCost = get(accCopy, [key, 'cost']);
    if (isUndefined(existingCost) || existingCost > finalCost) {
      accCopy[key] = {
        cost: finalCost,
        departure,
        arrival,
        transport,
      };
    }
    return accCopy;
  }, {});

export const dealsFilter = (dealReferences, normalizedDeals) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Array.isArray(dealReferences) &&
  dealReferences.map(val => normalizedDeals[val]);

export default {
  extractMinFareDeals,
  extractQuickestDeals,
  dealsFilter,
};
