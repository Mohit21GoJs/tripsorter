/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
import { isUndefined, get } from 'lodash';
import dijkstra from 'packages/dijkstra/dijkstra';
import {
  calculateCostWithDiscount,
  calculateTimeInMinutes,
} from '@modules/trips/utils';
import { makeGraphFromMinFares } from '@modules/trips/utils/graph';
import { normalizeDeals } from '@modules/trips/utils/deal';

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

export const getCheapestDeals = ({ deals, currency, source, destination }) => {
  const minFareDeals = extractMinFareDeals(deals);
  const graph = makeGraphFromMinFares(minFareDeals);
  const { distances } = dijkstra(graph, graph.getVertexByKey(source));
  const path = distances[destination];
  const normalizedDeals = normalizeDeals(deals);
  const dealData = dealsFilter(path.edges, normalizedDeals);
  return {
    currency,
    deals: dealData,
    totalCost: path.val,
  };
};

export const getQuickestDeals = ({ deals, currency, source, destination }) => {
  const minFareDeals = extractQuickestDeals(deals);
  const graph = makeGraphFromMinFares(minFareDeals);
  const { distances } = dijkstra(graph, graph.getVertexByKey(source));
  const path = distances[destination];
  const normalizedDeals = normalizeDeals(deals);
  const dealData = dealsFilter(path.edges, normalizedDeals);
  return {
    currency,
    deals: dealData,
    totalTime: path.val,
  };
};

export default {
  extractMinFareDeals,
  extractQuickestDeals,
  dealsFilter,
  getQuickestDeals,
  getCheapestDeals,
};
