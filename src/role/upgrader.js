// vim: tw=80 ts=2 sw=2 et

const util = require('creep');

module.exports = {
  run: (creep) => {
    if (creep.memory.state === "withdrawing") {
      const source = Game.spawns[creep.memory.spawned_from];
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
      if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.state = "upgrading";
      }
    } else {
      const controller = creep.room.controller;
      if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { range: 3 });
      }
      if (creep.carry.energy == 0) {
        creep.memory.state = "withdrawing";
      }
    }
  }
};
