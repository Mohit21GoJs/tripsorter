/* eslint-disable object-curly-newline */
import faresData from '@modules/trips/data/fares.json';
import {
  calculateTotalTimeForDeal,
  calculateTotalCostForDeal,
} from '@modules/trips/utils/deal';
import BaseController from '@modules/trips/controllers/BaseController';
import {
  getQuickestDeals,
  getCheapestDeals,
} from '@modules/trips/helpers/Search';

// @TODO: case when cost is same so second fallback to time - think
// @TODO:  use async await
// @TODO: handle case with same distance from 2 paths
// Req validation using joi
// @Enhancements: memoize, compression, higher order ffunction, error handling, unit test

const mapDealsResponse = ({ deals, currency, totalCost, totalTime }) => ({
  currency,
  deals,
  totalCost: totalCost || calculateTotalCostForDeal(deals),
  totalTime: totalTime || calculateTotalTimeForDeal(deals),
});
/**
 *
 * @param {Object} req - Eventemitter req stream
 * @param {Object} res - Eventemitter res stream
 * @param {Function} next - next callback in middleware chain
 */
// eslint-disable-next-line arrow-parens
const SearchController = BaseController(req => {
  const { source, destination, quickest, cheapest } = req.body;
  const { deals, currency } = faresData;
  let responseData = {};
  if (cheapest) {
    const cheapestDealData = getCheapestDeals({
      deals,
      currency,
      source,
      destination,
    });
    responseData = mapDealsResponse(cheapestDealData);
  } else if (quickest) {
    const quickestDealData = getQuickestDeals({
      deals,
      currency,
      source,
      destination,
    });
    responseData = mapDealsResponse(quickestDealData);
  }
  return responseData;
});

export default SearchController;
