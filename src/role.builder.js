const util = require('creep');

module.exports = {
  run: (creep) => {
    if (creep.memory.state === "building") {
      if (creep.carry.energy > 0) {
        // still building
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
          if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            util.move(creep, targets[0]);
          }
        }
      } else {
        // just finished building
        creep.memory.state = "collecting";
      }
    } else {
      if (creep.carry.energy < creep.carryCapacity) {
        // still filling up
        const spawn = Game.spawns['Initial'];
        if (creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          util.move(creep, spawn);
        }
      } else {
        // just finished filling up
        creep.memory.state = "building";
      }
    }
  }
};
