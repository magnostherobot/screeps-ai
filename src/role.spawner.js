const creeps = new Map([
  [ 'harvester', 5 ],
  [ 'upgrader', 10 ]
]);

const spawnCreep = (spawn, job, tools) => {
  const name = job + Game.time;
  if (spawn.spawnCreep(tools, name) == OK) {
    Memory.counts[job]++;
    Game.creeps[name].memory.job = job;
  }
};

const creepSpawnerFunctions = {
  harvester: (spawn) => {
    spawnCreep(spawn, 'harvester', [WORK, MOVE, CARRY]);
  },
  upgrader: (spawn) => {
    spawnCreep(spawn, 'upgrader', [WORK, MOVE, CARRY]);
  }
};

module.exports = {
  run: (spawn) => {
    for (const job in creeps) {
      if (Memory.counts[job] < creeps[job]) {
        creepSpawnerFunctions[job](spawn);
      }
    }
  }
};
