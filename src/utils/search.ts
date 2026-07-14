export interface SearchableBuilding {
  id: string;
  name: string;
}

/**
 * Finds the best building match for a free-text query: an exact
 * case-insensitive name match, falling back to a substring match.
 * Returns null if nothing matches (or the query/list is empty).
 */
export function findBestBuildingMatch<T extends SearchableBuilding>(
  buildings: T[] | null | undefined,
  query: string
): T | null {
  const normalized = query.trim().toLowerCase();
  if (!normalized || !buildings) return null;

  const exactMatch = buildings.find(
    (building) => building.name.toLowerCase() === normalized
  );
  if (exactMatch) return exactMatch;

  const partialMatch = buildings.find((building) =>
    building.name.toLowerCase().includes(normalized)
  );
  return partialMatch || null;
}
