import faresData from '@modules/trips/data/fares.json';
import dijkstra from 'packages/dijkstra/dijkstra';
import {
  extractMinFareDeals,
  extractQuickestDeals,
  dealsFilter,
} from '@modules/trips/helpers/Search';
import {
  calculateTotalTimeForDeal,
  calculateTotalCostForDeal,
  normalizeDeals,
} from '@modules/trips/utils/deal';
import { makeGraphFromMinFares } from '@modules/trips/utils/graph';

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
const SearchController = async (req, res, next) => {
  try {
    const { source, destination, quickest, cheapest } = req.body;
    const { deals, currency } = faresData;
    if (cheapest) {
      const minFareDeals = extractMinFareDeals(deals);
      const graph = makeGraphFromMinFares(minFareDeals);
      const { distances } = dijkstra(graph, graph.getVertexByKey(source));
      const path = distances[destination];
      const normalizedDeals = normalizeDeals(deals);
      const dealData = dealsFilter(path.edges, normalizedDeals);
      const responseData = mapDealsResponse({
        currency,
        deals: dealData,
        totalCost: path.val,
      });
      res.send({ ...responseData });
    } else if (quickest) {
      const minFareDeals = extractQuickestDeals(deals);
      const graph = makeGraphFromMinFares(minFareDeals);
      const { distances } = dijkstra(graph, graph.getVertexByKey(source));
      const path = distances[destination];
      const normalizedDeals = normalizeDeals(deals);
      const dealData = dealsFilter(path.edges, normalizedDeals);
      const responseData = mapDealsResponse({
        currency,
        deals: dealData,
        totalTime: path.val,
      });
      res.send({ ...responseData });
    }
  } catch (e) {
    res.status(500).send({
      error: 'Something went wrong',
      err: e.message,
    });
  }
  next();
};

export default SearchController;
