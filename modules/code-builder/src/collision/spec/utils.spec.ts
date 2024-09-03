import { checkCollision } from '../utils';
import type { TCollisionObject } from '@/@types/collision';

describe('Collision Utils', () => {
  describe('checkCollision', () => {
    const objA: TCollisionObject = { id: 'A', x: 0, y: 0, width: 10, height: 10 };
    const objB: TCollisionObject = { id: 'B', x: 5, y: 5, width: 10, height: 10 };
    const objC: TCollisionObject = { id: 'C', x: 20, y: 20, width: 10, height: 10 };

    it('should detect collision between overlapping circles', () => {
      expect(checkCollision(objA, objB, { objType: 'circle', colThres: 0 })).toBe(true);
    });

    it('should not detect collision between non-overlapping circles', () => {
      expect(checkCollision(objA, objC, { objType: 'circle', colThres: 0 })).toBe(false);
    });

    it('should detect collision between overlapping rectangles', () => {
      expect(checkCollision(objA, objB, { objType: 'rect', colThres: 0 })).toBe(true);
    });

    it('should not detect collision between non-overlapping rectangles', () => {
      expect(checkCollision(objA, objC, { objType: 'rect', colThres: 0 })).toBe(false);
    });

    it('should respect collision threshold for circles', () => {
      expect(checkCollision(objA, objB, { objType: 'circle', colThres: 0.9 })).toBe(false);
    });

    it('should respect collision threshold for rectangles', () => {
      expect(checkCollision(objA, objB, { objType: 'rect', colThres: 0.9 })).toBe(false);
    });
  });
});