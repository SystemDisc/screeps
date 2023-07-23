"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.harvesterRun = void 0;
const harvesterRun = (room) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.harvesterRun = harvesterRun;
