export const harvesterRun = (room: Room) => {
  const myHarvesters = room.find(FIND_MY_CREEPS).filter(creep => creep.name.startsWith('Harvester'));

  const spawn = room.find(FIND_MY_SPAWNS).reduce((highestEnergySpawn, spawn) => (
    spawn.store[RESOURCE_ENERGY] > highestEnergySpawn.store[RESOURCE_ENERGY] ? spawn : highestEnergySpawn
  ));

  if (myHarvesters.length === 0) {
    if (spawn.store[RESOURCE_ENERGY] < 300) {
      spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
    } else {
      spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester1');
    }
  } else if (myHarvesters.length < 10) {
    if (spawn.store[RESOURCE_ENERGY] >= 300) {
      spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], `Harvester${myHarvesters.length + 1}`);
    }
  }

  for (const myHarvester of myHarvesters) {
    if (myHarvester.store[RESOURCE_ENERGY] < myHarvester.store.getCapacity(RESOURCE_ENERGY)) {
      const source = room.find(FIND_SOURCES).reduce((closestSource, source) => {
        const upTiles = room.lookAt(source.pos.x, source.pos.y - 1);
        const upRightTiles = room.lookAt(source.pos.x + 1, source.pos.y - 1);
        const rightTiles = room.lookAt(source.pos.x + 1, source.pos.y);
        const downRightTiles = room.lookAt(source.pos.x + 1, source.pos.y + 1);
        const downTiles = room.lookAt(source.pos.x, source.pos.y + 1);
        const downLeftTiles = room.lookAt(source.pos.x - 1, source.pos.y + 1);
        const leftTiles = room.lookAt(source.pos.x - 1, source.pos.y);
        const upLeftTiles = room.lookAt(source.pos.x - 1, source.pos.y - 1);
        const sourceAvailable = (
          upTiles.length === 1 && upTiles[0].terrain !== 'wall' ||
          upRightTiles.length === 1 && upRightTiles[0].terrain !== 'wall' ||
          rightTiles.length === 1 && rightTiles[0].terrain !== 'wall' ||
          downRightTiles.length === 1 && downRightTiles[0].terrain !== 'wall' ||
          downTiles.length === 1 && downTiles[0].terrain !== 'wall' ||
          downLeftTiles.length === 1 && downLeftTiles[0].terrain !== 'wall' ||
          leftTiles.length === 1 && leftTiles[0].terrain !== 'wall' ||
          upLeftTiles.length === 1 && upLeftTiles[0].terrain !== 'wall'
        );
        const closestUpTiles = room.lookAt(source.pos.x, source.pos.y - 1);
        const closestUpRightTiles = room.lookAt(source.pos.x + 1, source.pos.y - 1);
        const closestRightTiles = room.lookAt(source.pos.x + 1, source.pos.y);
        const closestDownRightTiles = room.lookAt(source.pos.x + 1, source.pos.y + 1);
        const closestDownTiles = room.lookAt(source.pos.x, source.pos.y + 1);
        const closestDownLeftTiles = room.lookAt(source.pos.x - 1, source.pos.y + 1);
        const closestLeftTiles = room.lookAt(source.pos.x - 1, source.pos.y);
        const closestUpLeftTiles = room.lookAt(source.pos.x - 1, source.pos.y - 1);
        const closestSourceAvailable = (
          closestUpTiles.length === 1 && closestUpTiles[0].terrain !== 'wall' ||
          closestUpRightTiles.length === 1 && closestUpRightTiles[0].terrain !== 'wall' ||
          closestRightTiles.length === 1 && closestRightTiles[0].terrain !== 'wall' ||
          closestDownRightTiles.length === 1 && closestDownRightTiles[0].terrain !== 'wall' ||
          closestDownTiles.length === 1 && closestDownTiles[0].terrain !== 'wall' ||
          closestDownLeftTiles.length === 1 && closestDownLeftTiles[0].terrain !== 'wall' ||
          closestLeftTiles.length === 1 && closestLeftTiles[0].terrain !== 'wall' ||
          closestUpLeftTiles.length === 1 && closestUpLeftTiles[0].terrain !== 'wall'
        );
        if (
          (myHarvester.pos.getRangeTo(source) < myHarvester.pos.getRangeTo(closestSource) && sourceAvailable && closestSourceAvailable) ||
          sourceAvailable && !closestSourceAvailable
        ) {
          return source;
        }
        return closestSource;
      });
      const spawn = room.find(FIND_MY_SPAWNS).reduce((closestSpawn, spawn) => (
        myHarvester.pos.getRangeTo(spawn) < myHarvester.pos.getRangeTo(closestSpawn) ? spawn : closestSpawn
      ));
      if (myHarvester.pos.getRangeTo(spawn) < myHarvester.pos.getRangeTo(source)) {
        if (myHarvester.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          myHarvester.moveTo(spawn);
        }
      }
      if (myHarvester.harvest(source) === ERR_NOT_IN_RANGE) {
        myHarvester.moveTo(source);
      }
    } else {
      const spawn = room.find(FIND_MY_SPAWNS).reduce((closestSpawn, spawn) => (
        myHarvester.pos.getRangeTo(spawn) < myHarvester.pos.getRangeTo(closestSpawn) ? spawn : closestSpawn
      ));
      if (myHarvester.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        myHarvester.moveTo(spawn);
      }
    }
  }
};