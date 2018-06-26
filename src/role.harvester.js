const move = (creep, x, y) => {
  if (y === undefined) return move(creep, x.pos.x, x.pos.y);
  switch (creep.moveTo(x, y)) {
    case 0:
      return true;
    case -2:
      console.log(creep + " could not move to " + x + ", " + y);
      for (i = -1; i <= 1; ++i) {
        for (j = -1; j <= 1; ++j) {
          if (creep.moveTo(x + i, y + j)) return true;
        }
      }
    default:
      return false;
  }
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
