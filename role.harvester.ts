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
      const source = room.find(FIND_SOURCES).reduce((closestSpawn, source) => (
        myHarvester.pos.getRangeTo(source) < myHarvester.pos.getRangeTo(closestSpawn) ? source : closestSpawn
      ));
      if (myHarvester.harvest(source) === ERR_NOT_IN_RANGE) {
        myHarvester.moveTo(source);
      } else {
        const spawn = room.find(FIND_MY_SPAWNS).reduce((closestSpawn, spawn) => (
          myHarvester.pos.getRangeTo(spawn) < myHarvester.pos.getRangeTo(closestSpawn) ? spawn : closestSpawn
        ));
        if (myHarvester.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          myHarvester.moveTo(spawn);
        }
      }
    }
  }
};