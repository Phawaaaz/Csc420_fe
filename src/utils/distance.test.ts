import { describe, it, expect } from 'vitest';
import { haversineDistance, walkingDuration } from './distance';

describe('haversineDistance', () => {
  it('returns 0 for identical coordinates', () => {
    expect(haversineDistance(8.4799, 4.5418, 8.4799, 4.5418)).toBe(0);
  });

  it('matches the known distance between the Senate Building and University Library fixtures', () => {
    // Same two points used to seed public/data/graph.json's edge distance.
    const distance = haversineDistance(8.4799, 4.5418, 8.4808, 4.5432);
    expect(distance).toBe(184);
  });

  it('is symmetric regardless of point order', () => {
    const a = haversineDistance(8.4799, 4.5418, 8.4825, 4.5445);
    const b = haversineDistance(8.4825, 4.5445, 8.4799, 4.5418);
    expect(a).toBe(b);
  });
});

describe('walkingDuration', () => {
  it('converts distance to seconds at ~1.4 m/s', () => {
    expect(walkingDuration(140)).toBe(100);
  });

  it('returns 0 for zero distance', () => {
    expect(walkingDuration(0)).toBe(0);
  });
});
