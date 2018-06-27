const util = require('creep');

module.exports = {
  run: (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        util.move(creep, source);
      }
    } else {
      const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION
              ||  structure.structureType == STRUCTURE_SPAWN)
              && structure.energy < structure.energyCapacity;
        }
      });
      if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        util.move(creep, spawn);
      }
    }
  }
};
