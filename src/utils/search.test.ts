import { describe, it, expect } from 'vitest';
import { findBestBuildingMatch } from './search';

const buildings = [
  { id: 'main-library', name: 'University Library' },
  { id: 'cis-faculty', name: 'Faculty of Communication and Information Sciences' },
  { id: 'senate-building', name: 'Senate Building' },
];

describe('findBestBuildingMatch', () => {
  it('matches case-insensitively on exact name', () => {
    expect(findBestBuildingMatch(buildings, 'senate building')?.id).toBe(
      'senate-building'
    );
  });

  it('falls back to a substring match', () => {
    expect(findBestBuildingMatch(buildings, 'Library')?.id).toBe('main-library');
  });

  it('prefers an exact match over a substring match', () => {
    const withExact = [
      { id: 'lib', name: 'Library' },
      { id: 'lib-annex', name: 'Library Annex' },
    ];
    expect(findBestBuildingMatch(withExact, 'Library')?.id).toBe('lib');
  });

  it('returns null when nothing matches', () => {
    expect(findBestBuildingMatch(buildings, 'Sports Complex')).toBeNull();
  });

  it('returns null for an empty or whitespace-only query', () => {
    expect(findBestBuildingMatch(buildings, '   ')).toBeNull();
  });

  it('returns null when the building list is null or undefined', () => {
    expect(findBestBuildingMatch(null, 'Library')).toBeNull();
    expect(findBestBuildingMatch(undefined, 'Library')).toBeNull();
  });
});
