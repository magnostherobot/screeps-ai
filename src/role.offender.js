const util = require('creep');

module.exports = {
  run: (creep) => {
    const hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
      if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
        util.move(creep, hostiles[0]);
      }
    }
  }
};
