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
exports.loop = void 0;
const role_harvester_1 = require("./role.harvester");
const loop = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Object.keys(Game.rooms).reduce((promise, roomName) => __awaiter(void 0, void 0, void 0, function* () {
        yield promise;
        const room = Game.rooms[roomName];
        yield (0, role_harvester_1.harvesterRun)(room);
    }), Promise.resolve());
});
exports.loop = loop;
