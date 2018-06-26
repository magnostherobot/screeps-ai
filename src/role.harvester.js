const move = require('creep');

module.exports = {
  run: (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
      // just use the first source for now
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        move(creep, source);
      }
    } else {
      const spawn = Game.spawns['Initial'];
      if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        move(creep, spawn);
      }
    }
  }
};
