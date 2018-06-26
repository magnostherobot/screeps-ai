const creeps = new Map([
  [ 'harvester', 5 ],
  [ 'upgrader', 1 ],
  [ 'offender', 3 ],
  [ 'builder', 3 ]
]);

const spawnCreep = (spawn, job, tools) => {
  const name = job + Game.time;
  if (spawn.spawnCreep(tools, name, { memory: { role: job } }) == OK) {
    Memory.counts[job]++;
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
    creeps.forEach((count, job) => {
      if (Memory.counts[job] < count) {
        creepSpawnerFunctions[job](spawn);
      }
    });
  }
};
