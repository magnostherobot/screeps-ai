// vim: tw=80 ts=2 sw=2 et

const creeps = new Map([
  [ 'upgrader', 1 ],
  [ 'offender', 0 ],
  [ 'builder', 3 ],
  [ 'harvester', 5 ]
]);

const spawnCreep = (spawn, job, tools) => {
  const name = job + Game.time;
  const new_memory = {
    job: job,
    path: {},

    /*
     * TODO: Is it better to keep the spawner's name (for retreival via
     * Game.spawns[]) or to keep its id (for retrieval via
     * Game.getObjectById())?
     */
    spawned_from: spawn.name
  };

  if (spawn.spawnCreep(tools, name, { memory: new_memory }) == OK) {
    spawn.log(`spawning a new ${job}`);
    Memory.counts[job]++;
  }
};

const creepSpawnerFunctions = {
  harvester: (spawn) => {
    spawnCreep(spawn, 'harvester', [WORK, MOVE, CARRY]);
  },
  upgrader: (spawn) => {
    spawnCreep(spawn, 'upgrader', [WORK, MOVE, CARRY]);
  },
  offender: (spawn) => {
    spawnCreep(spawn, 'offender', [ATTACK, MOVE]);
  },
  builder: (spawn) => {
    spawnCreep(spawn, 'builder', [MOVE, MOVE, WORK, CARRY]);
  }
};

module.exports = {
  run: (spawn) => {
    creeps.forEach((count, job) => {
      if (Memory.counts[job] < count) {
        creepSpawnerFunctions[job](spawn);
      }
    });
  }
};
