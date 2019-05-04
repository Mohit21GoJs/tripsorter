import { isUndefined, get } from 'lodash';
import faresData from '@modules/trips/data/fares.json';
import GraphVertex from 'packages/data-structures/graph/GraphVertex';
import GraphEdge from 'packages/data-structures/graph/GraphEdge';
import Graph from 'packages/data-structures/graph/Graph';
import dijkstra from 'packages/dijkstra/dijkstra';

// @TODO: case when cost is same so second fallback to time - think
// @TODO:  use async await
// @TODO: handle case with same distance from 2 paths
// Req validation using joi
// @Enhancements: memoize, compression, higher order ffunction, error handling, unit test

const calculateCostWithDiscount = (cost, discount) =>
  discount ? cost - (cost * discount) / 100 : cost;

export const extractMinFareDeals = deals =>
  Array.isArray(deals) &&
  deals.reduce((acc, val) => {
    const accCopy = { ...acc };
    const { departure, arrival, cost, discount } = val;
    const finalCost = calculateCostWithDiscount(cost, discount);
    const key = `${departure}_${arrival}`;
    const existingCost = get(accCopy, [key, 'cost']);
    if (isUndefined(existingCost) || existingCost > finalCost) {
      accCopy[key] = {
        cost: finalCost,
        departure: val.departure,
        arrival: val.arrival,
        reference: val.reference,
      };
    }
    return accCopy;
  }, {});

const calculateTimeInMinutes = (hours, minutes) =>
  Number(hours) * 60 + Number(minutes);

export const extractQuickestDeals = deals =>
  Array.isArray(deals) &&
  deals.reduce((acc, val) => {
    const accCopy = { ...acc };
    const {
      departure,
      arrival,
      duration: { h: hours, m: minutes },
    } = val;
    const finalCost = calculateTimeInMinutes(hours, minutes);
    const key = `${departure}_${arrival}`;
    const existingCost = get(accCopy, [key, 'cost']);
    if (isUndefined(existingCost) || existingCost > finalCost) {
      accCopy[key] = {
        cost: finalCost,
        departure: val.departure,
        arrival: val.arrival,
        reference: val.reference,
      };
    }
    return accCopy;
  }, {});

export const normalizeDeals = deals =>
  Array.isArray(deals) &&
  deals.reduce(
    (acc, val) => ({
      ...acc,
      [val.reference]: {
        ...val,
      },
    }),
    {},
  );

export const dealsFilter = (dealReferences, normalizedDeals) =>
  Array.isArray(dealReferences) &&
  dealReferences.map(val => normalizedDeals[val]);

// eslint-disable-next-line arrow-parens
export const makeGraphFromMinFares = minFaresData => {
  const keys = Object.keys(minFaresData);
  const graph = new Graph(true);
  // eslint-disable-next-line arrow-parens
  keys.forEach(val => {
    const [startVertexKey, endVertexKey] = val.split('_');

    let startVertex = graph.getVertexByKey(startVertexKey);
    let endVertex = graph.getVertexByKey(endVertexKey);
    if (!startVertex) {
      startVertex = new GraphVertex(startVertexKey);
      graph.addVertex(startVertex);
    }
    if (!endVertex) {
      endVertex = new GraphVertex(endVertexKey);
      graph.addVertex(endVertex);
    }
    const edge = new GraphEdge(
      startVertex,
      endVertex,
      minFaresData[val].cost,
      minFaresData[val].reference,
    );
    graph.addEdge(edge);
  });
  return graph;
};

const mapDealsResponse = ({ deals, currency, totalCost }) => ({
  currency,
  deals,
  totalCost,
});
/**
 *
 * @param {Object} req - Eventemitter req stream
 * @param {Object} res - Eventemitter res stream
 * @param {Function} next - next callback in middleware chain
 */
const SearchController = async (req, res, next) => {
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
      totalCost: path.val,
    });
    res.send({ ...responseData });
  }

  next();
};

export default SearchController;
