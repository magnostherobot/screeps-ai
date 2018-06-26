const move = (creep, target) => {
  const path = creep.room.findPath(creep.pos, target.pos);
  creep.move(path[0].direction);
}

module.exports = {
  run: (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
      // just use the first sourrce for now
      const source = creep.room.find(FIND_SOURCES)[0];
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
