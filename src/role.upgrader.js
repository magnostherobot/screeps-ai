module.exports = {
  run: (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
      const source = Game.spawns['Initial'];
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      const controller = creep.room.controller;
      if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { range: 3 });
      }
    }
  }
};
