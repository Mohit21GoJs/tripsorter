import GraphVertex from 'packages/data-structures/graph/GraphVertex';
import GraphEdge from 'packages/data-structures/graph/GraphEdge';
import Graph from 'packages/data-structures/graph/Graph';
import { makeUniqueDealKey } from '@modules/trips/utils/deal';

// @todo: rename
/**
 * Make graph from min fares/time data
 * @param {object} minFaresData
 * @returns {Graph}
 */
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
      makeUniqueDealKey(minFaresData[val]),
    );
    graph.addEdge(edge);
  });
  return graph;
};

export default {
  makeGraphFromMinFares,
};
