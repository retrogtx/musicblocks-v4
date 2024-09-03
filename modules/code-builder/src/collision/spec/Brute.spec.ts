import CollisionSpaceBrute from '../Brute';
import type { TCollisionObject } from '@/@types/collision';

describe('CollisionSpaceBrute', () => {
  let collisionSpace: CollisionSpaceBrute;

  beforeEach(() => {
    collisionSpace = new CollisionSpaceBrute(100, 100);
  });

  it('should add objects correctly', () => {
    const objects: TCollisionObject[] = [
      { id: 'A', x: 10, y: 10, width: 10, height: 10 },
      { id: 'B', x: 20, y: 20, width: 10, height: 10 },
    ];
    collisionSpace.addObjects(objects);
    expect(collisionSpace['_objects'].length).toBe(2);
  });

  it('should delete objects correctly', () => {
    const objects: TCollisionObject[] = [
      { id: 'A', x: 10, y: 10, width: 10, height: 10 },
      { id: 'B', x: 20, y: 20, width: 10, height: 10 },
    ];
    collisionSpace.addObjects(objects);
    collisionSpace.delObjects([{ id: 'A', x: 0, y: 0, width: 0, height: 0 }]);
    expect(collisionSpace['_objects'].length).toBe(1);
    expect(collisionSpace['_objects'][0].id).toBe('B');
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
    expect(collisionSpace['_objects'].length).toBe(0);
  });
});