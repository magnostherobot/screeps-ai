// vim: tw=80 ts=2 sw=2 et

const _ = require("lodash");

const states = {
  IDLE: 1,
  COLLECTING: "collecting",
  MAINTINING: 3,
  BUILDING: 4
};

Room.prototype.createCostMatrices = function() {
  let roadGrid = new PathFinder.CostMatrix();
  let structGrid = new PathFinder.CostMatrix();

  for (let i = 0; i < 625; i++) {
    if (i % 2 === 0) {
      roadGrid.set(i % 25, Math.floor(i / 25), 20);
    } else {
      structGrid.set(i % 25, Math.floor(i / 25), 20);
    }
  }

  this.memory.cm.road = roadGrid;
  this.memory.cm.struct = structGrid;
}

Structure.prototype.log = function(msg) {
  console.log(`${this.name}: ${msg}`);
};

Creep.prototype.isFull = function() {
  return _.sum(this.carry) >= this.carryCapacity;
}

Creep.prototype.log = function(msg, say) {
  this.say(say || msg);
  console.log(`${this.name}: ${msg}`);
};

Creep.prototype.error = function(msg, say) {
	this.log(msg, say || "???");
};

Creep.prototype.construct = function() {
  const targetID = this.memory.target.id;
  const target = Game.getObjectById(targetID);

  const res = this.build(target);
  switch (res) {
    case OK:
      break;
    case ERR_NOT_IN_RANGE:
      this.moveTo(target);
      break;
    default:
      this.log(res);
      this.goIdle();
  }
};

Creep.prototype.maintain = function() {
  const target = this.memory.target;

  switch (this.repair(target)) {
    case OK:
      break;
    case ERR_NOT_IN_RANGE:
      this.moveTo(target);
      break;
    default:
      return this.goIdle();
  }
};

Creep.prototype.collect = function() {
  const targetID = this.memory.target.id;
  // const target = Game.getObjectById(targetID);
  const target = Game.spawns['Spawn1'];

  if (this.isFull()) {
    return this.goIdle();
  }

  const res = this.withdraw(target, RESOURCE_ENERGY);
  switch (res) {
    case OK:
      break;
    case ERR_NOT_IN_RANGE:
      this.moveTo(target);
      break;
    default:
      // goIdle(this);
  }
};

Creep.prototype.goIdle = function() {
  this.memory.state = states.IDLE;
  delete this.memory.target;
};

Creep.prototype.needsNewPath = function(target) {
  if (this.memory.path == null) {
    return true;
  }

  if (this.memory.path.length == 0) {
    return true;
  }

  const endOfPath = this.memory.path[this.memory.path.length - 1];

  /*
   * Not entirely sure what was happening, but for some reason a creep had an
   * empty object for a path, which I couldn't replace. This check prevents that
   * issue from breaking the creep's pathfinding.
   */
  if (endOfPath == null) {
    return true;
  }

  if (!target.pos.isNearTo(endOfPath.x, endOfPath.y)) {
    return true;
  }

  return false;
}

Creep.prototype._moveTo = Creep.prototype.moveTo;
Creep.prototype.moveTo = function(target, opts) {

  /*
   * TODO
   * Currently, creeps are getting stuck behind each other, because this system
   * doesn't recalculate the path if things are in the way. Might be worth
   * storing in each creep's memory whether or not it's moving, as if it's
   * stationary it can block an entire queue of creeps.
   */

  if (this.needsNewPath(target)) {
    // this.log(`moving to ${target.pos}`, `->${target.pos.x},${target.pos.y}`);
    const pathfinderOpts = {
      visualizePathStyle: {},
      ...opts
    };
    this.memory.path = this.pos.findPathTo(target, pathfinderOpts);
  }

  return this.moveByPath(this.memory.path);
};

module.exports = {
  resetCreepField: (field, set) => {
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (set === undefined) {
        delete creep.memory[field];
      } else {
        Memory.creeps[name][field] = set;
        // creep.memory.field = set;
        console.log(Memory.creeps[name][field]);
      }
    }
  },
  buildRoadsBetween: (a, b) => {
    const pfres = PathFinder.search(a, b, {
      plainCost: 1,
      swampCost: 1
    });

    pfres.path.forEach((p) => p.createConstructionSite(STRUCTURE_ROAD));
  },
  amILoaded: () => {
    console.log("yes");
  }
};
