"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const role_harvester_1 = require("./role.harvester");
const loop = () => {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        (0, role_harvester_1.harvesterRun)(room);
    }
};
exports.loop = loop;
