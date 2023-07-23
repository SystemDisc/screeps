"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harvesterRun = void 0;
const harvesterRun = async (room) => {
    const myCreeps = room.find(FIND_MY_CREEPS);
    const harvesterCount = myCreeps.reduce((sum, creep) => {
        return creep.memory.harvester ? sum + 1 : sum;
    }, 0);
    if (harvesterCount === 0) {
        const spawn = room.find(FIND_MY_SPAWNS).reduce((highestEnergySpawn, spawn) => (spawn.store[RESOURCE_ENERGY] > highestEnergySpawn.store[RESOURCE_ENERGY] ? spawn : highestEnergySpawn));
        if (spawn.store[RESOURCE_ENERGY] < 300) {
            spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
        }
        else if (spawn.store[RESOURCE_ENERGY] == 300) {
            spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester1');
        }
    }
    else {
    }
};
exports.harvesterRun = harvesterRun;
