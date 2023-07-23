import { harvesterRun } from './role.harvester';

export const loop = () => {
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    harvesterRun(room);
  }
};