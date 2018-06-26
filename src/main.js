const jobs = {
  harvester: require('role.harvester'),
  upgrader: require('role.upgrader'),
  spawner: require('role.spawner')
};

module.exports.loop = () => {
  for (const name in Game.spawns) {
    jobs.spawner.run(Game.spawns[name]);
  }
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    const job = jobs[creep.memory.job];
    if (job) {
      job.run(creep);
    } else {
      console.log(creep.name + " is missing instructions for job "
        + creep.memory.job);
    }
    if (creep.ticksToLive == 1) {
      Memory.counts[creep.memory.job]--;
    }
  }
};
