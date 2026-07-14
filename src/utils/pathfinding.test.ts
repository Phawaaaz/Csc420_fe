import { describe, it, expect } from 'vitest';
import { findShortestPath, type Graph } from './pathfinding';

const graph: Graph = {
  nodes: [
    { id: 'a', latitude: 0, longitude: 0, connections: ['b', 'c'] },
    { id: 'b', latitude: 0, longitude: 1, connections: ['a', 'd'] },
    { id: 'c', latitude: 1, longitude: 0, connections: ['a', 'd'] },
    { id: 'd', latitude: 1, longitude: 1, connections: ['b', 'c'] },
    { id: 'isolated', latitude: 5, longitude: 5, connections: [] },
  ],
  edges: [
    { from: 'a', to: 'b', distance: 100 },
    { from: 'a', to: 'c', distance: 10 },
    { from: 'b', to: 'd', distance: 10 },
    { from: 'c', to: 'd', distance: 10 },
  ],
};

describe('findShortestPath', () => {
  it('picks the cheaper route over a shorter-hop-count route', () => {
    // a->b->d is 2 hops but costs 110; a->c->d is 2 hops and costs 20.
    const path = findShortestPath(graph, 'a', 'd');
    expect(path?.map((n) => n.id)).toEqual(['a', 'c', 'd']);
  });

  it('returns a single-node path when from and to are the same', () => {
    const path = findShortestPath(graph, 'a', 'a');
    expect(path?.map((n) => n.id)).toEqual(['a']);
  });

  it('returns null when there is no route to an isolated node', () => {
    expect(findShortestPath(graph, 'a', 'isolated')).toBeNull();
  });

  it('returns null for an unknown destination id', () => {
    expect(findShortestPath(graph, 'a', 'nope')).toBeNull();
  });

  it('returns null for an unknown origin id', () => {
    expect(findShortestPath(graph, 'nope', 'a')).toBeNull();
  });

  it('finds the direct edge when two nodes are directly connected', () => {
    const path = findShortestPath(graph, 'a', 'c');
    expect(path?.map((n) => n.id)).toEqual(['a', 'c']);
  });
});
