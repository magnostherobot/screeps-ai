const jobs = {
  harvester: require('role.harvester')
};

const spawnCreep = (spawn, job, tools) => {
  Memory.counts[job]++;
  const name = job + Memory.counts[job];
  spawn.spawnCreep(tools, name);
  Game.creeps[name].memory.job = job;
}

const spawnHarvester = (spawn) => {
  spawnCreep(spawn, 'harvester', [WORK, MOVE, CARRY]);
}

module.exports.loop = () => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    const job = jobs[creep.memory.job];
    if (job) {
      job.run(creep);
    } else {
      console.log(creep.name + " is missing instructions for job "
        + creep.memory.job);
    }
  }
}
