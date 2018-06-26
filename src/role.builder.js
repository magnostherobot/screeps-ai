module.exports = {
  run: (creep) => {
    if (creep.memory.state === "building") {
      if (creep.carry.energy > 0) {
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
          if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
          }
        }
      } else {
        creep.memory.state = "collecting";
      }
    } else {
      if (creep.carry.energy < creep.carryCapacity) {
        // still filling up
        if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn);
        }
      } else {
        creep.memory.state = "building";
      }
    }
  }
};
