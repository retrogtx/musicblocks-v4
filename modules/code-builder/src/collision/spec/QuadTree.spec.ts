import CollisionSpaceQuadTree from '../QuadTree';
import type { TCollisionObject } from '@/@types/collision';

describe('CollisionSpaceQuadTree', () => {
  let collisionSpace: CollisionSpaceQuadTree;

  beforeEach(() => {
    collisionSpace = new CollisionSpaceQuadTree(100, 100);
  });

  it('should add objects correctly', () => {
    const objects: TCollisionObject[] = [
      { id: 'A', x: 10, y: 10, width: 10, height: 10 },
      { id: 'B', x: 20, y: 20, width: 10, height: 10 },
    ];
    collisionSpace.addObjects(objects);
    expect(collisionSpace['_objMap'].size).toBe(2);
  });

  it('should delete objects correctly', () => {
    const objects: TCollisionObject[] = [
      { id: 'A', x: 10, y: 10, width: 10, height: 10 },
      { id: 'B', x: 20, y: 20, width: 10, height: 10 },
    ];
    collisionSpace.addObjects(objects);
    collisionSpace.delObjects([{ id: 'A', x: 0, y: 0, width: 0, height: 0 }]);
    expect(collisionSpace['_objMap'].size).toBe(1);
    expect(collisionSpace['_objMap'].has('B')).toBe(true);
  });

  it('should check collisions correctly', () => {
    const objects: TCollisionObject[] = [
      { id: 'A', x: 10, y: 10, width: 10, height: 10 },
      { id: 'B', x: 15, y: 15, width: 10, height: 10 },
      { id: 'C', x: 50, y: 50, width: 10, height: 10 },
    ];
    collisionSpace.addObjects(objects);
    collisionSpace.setOptions({ objType: 'rect', colThres: 0 });
    
    const collisions = collisionSpace.checkCollision({ id: 'Test', x: 12, y: 12, width: 10, height: 10 });
    expect(collisions).toContain('A');
    expect(collisions).toContain('B');
    expect(collisions).not.toContain('C');
  });

  it('should reset correctly', () => {
    const objects: TCollisionObject[] = [
      { id: 'A', x: 10, y: 10, width: 10, height: 10 },
      { id: 'B', x: 20, y: 20, width: 10, height: 10 },
    ];
    collisionSpace.addObjects(objects);
    collisionSpace.reset();
    expect(collisionSpace['_objMap'].size).toBe(0);
  });

  it('should not add objects outside the collision space', () => {
    const objects: TCollisionObject[] = [
      { id: 'A', x: -10, y: -10, width: 10, height: 10 },
      { id: 'B', x: 110, y: 110, width: 10, height: 10 },
    ];
    collisionSpace.addObjects(objects);
    expect(collisionSpace['_objMap'].size).toBe(0);
  });
});