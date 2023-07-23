"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const role_harvester_1 = require("./role.harvester");
const loop = async () => {
    await Object.keys(Game.rooms).reduce(async (promise, roomName) => {
        await promise;
        const room = Game.rooms[roomName];
        await (0, role_harvester_1.harvesterRun)(room);
    }, Promise.resolve());
};
exports.loop = loop;
