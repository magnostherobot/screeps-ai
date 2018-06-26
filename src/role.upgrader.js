const util = require('creep');

module.exports = {
  run: (creep) => {
    if (creep.memory.state === "withdrawing") {
      const source = Game.spawns['Initial'];
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        util.move(creep, source);
      }
      if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.state = "upgrading";
      }
    } else {
      const controller = creep.room.controller;
      if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        util.move(creep, controller, { range: 3 });
      }
      if (creep.carry.energy == 0) {
        creep.memory.state = "withdrawing";
      }
    }
  }
};
