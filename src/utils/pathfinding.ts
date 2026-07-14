export interface GraphNode {
  id: string;
  latitude: number;
  longitude: number;
  connections: string[];
}

export interface GraphEdge {
  from: string;
  to: string;
  distance: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/**
 * Shortest walking path between two graph nodes via Dijkstra's algorithm.
 * Returns null if either id is missing from the graph or no path connects them.
 */
export function findShortestPath(
  graph: Graph,
  fromId: string,
  toId: string
): GraphNode[] | null {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const unvisited = new Set<string>();

  graph.nodes.forEach((node) => {
    distances[node.id] = node.id === fromId ? 0 : Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });

  while (unvisited.size > 0) {
    let current = '';
    let smallestDistance = Infinity;
    unvisited.forEach((nodeId) => {
      if (distances[nodeId] < smallestDistance) {
        smallestDistance = distances[nodeId];
        current = nodeId;
      }
    });

    if (current === toId) {
      const path: GraphNode[] = [];
      let currentId: string | null = toId;
      while (currentId) {
        const node = graph.nodes.find((n) => n.id === currentId);
        if (node) path.unshift(node);
        currentId = previous[currentId];
      }
      return path;
    }

    if (smallestDistance === Infinity) break;

    unvisited.delete(current);

    const currentNode = graph.nodes.find((n) => n.id === current);
    if (currentNode) {
      currentNode.connections.forEach((neighborId) => {
        const edge = graph.edges.find(
          (e) =>
            (e.from === current && e.to === neighborId) ||
            (e.from === neighborId && e.to === current)
        );
        if (edge && unvisited.has(neighborId)) {
          const distance = distances[current] + edge.distance;
          if (distance < distances[neighborId]) {
            distances[neighborId] = distance;
            previous[neighborId] = current;
          }
        }
      });
    }
  }

  return null;
}
