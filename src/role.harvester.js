module.exports = {
  run: (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
      // just use the first sourrce for now
      const source = creep.room.find(FIND_SOURCES)[0];
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      const spawn = Game.spawns['Initial'];
      if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }
  }
};
