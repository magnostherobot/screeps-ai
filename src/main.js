const jobs = {
  harvester: require('role.harvester'),
  upgrader: require('role.upgrader'),
  spawner: require('role.spawner'),
  builder: require('role.builder'),
  offender: require('role.offender')
};

module.exports.loop = () => {
  for (const job in Memory.counts) {
    Memory.counts[job] = 0;
  }
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    const job = jobs[creep.memory.job];
    Memory.counts[creep.memory.job]++;
    if (job) {
      job.run(creep);
    } else {
      console.log(creep.name + " is missing instructions for job "
        + creep.memory.job);
    }
  }
  for (const name in Game.spawns) {
    jobs.spawner.run(Game.spawns[name]);
  }
};
