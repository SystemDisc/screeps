import { harvesterRun } from './role.harvester';

export const loop = async () => {
  await Object.keys(Game.rooms).reduce(async (promise, roomName) => {
    await promise;
    const room = Game.rooms[roomName];
    await harvesterRun(room);
  }, Promise.resolve());
};