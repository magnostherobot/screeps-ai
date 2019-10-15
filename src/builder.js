// vim: tw=80 ts=2 sw=2 et

const util = require('creep');

const states = {
  IDLE: 1,
  COLLECTING: "collecting",
  MAINTINING: 3,
  BUILDING: 4
};

/*
 * these three functions are a bit repetitve, might be enough to use the state
 * value as a key to the right method to use.
 * TODO
 */
function findWork(creep) {

  /*
   * first, fill up on power, if we're not full
   */
  if (!creep.isFull()) {
    const target = creep.room.find(FIND_SOURCES_ACTIVE)[0];

    creep.memory.target = target;
    creep.memory.state = states.COLLECTING;
    creep.log(
      `collecting energy from ${target}`,
      `${target.pos.x},${target.pos.y}`);
    return creep.collect();
  }

  /*
   * if we're full, then find a building to repair
   */
  const damagedBuildings = creep.room.find(FIND_MY_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax * 0.5,
  });
  if (damagedBuildings.length) {
    const target = damagedBuildings[0];
    creep.memory.target = target;
    creep.memory.state = states.MAINTAINING;
    creep.log(
      `repairing ${target}`,
      `${target.pos.x},${target.pos.y}`);
    return creep.maintain();
  }

  /*
   * if there's nothing to fix, find something to construct
   */
  const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
  if (constructionSites.length) {
    const target = constructionSites[0];
    creep.memory.target = target;
    creep.memory.state = states.BUILDING;
    creep.log(`building ${target}`, `${target.pos.x},${target.pos.y}`);
    return creep.construct();
  }

  /*
   * if there's nothing else to do, continue being idle
   */
};

function run(creep) {
  switch (creep.memory.state) {
    case states.BUILDING:
      creep.construct();
      break;
    case states.COLLECTING:
      creep.collect();
      break;
    case states.MAINTAINING:
      creep.maintain();
      break;
    case states.IDLE:
      findWork(creep);
      break;
    default:
      creep.error(`error: state ${creep.memory.state} unrecognised`);
  }
};

module.exports = {
  run: run
};
