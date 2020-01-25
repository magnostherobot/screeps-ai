// vim: tw=80 ts=2 sw=2 et

const jobs = {
  harvester: require('harvester'),
  upgrader: require('upgrader'),
  spawner: require('spawner'),
  builder: require('builder'),
  offender: require('offender')
};

Memory.counts = {};

module.exports.loop = () => {
  for (const job in jobs) {
    Memory.counts[job] = 0;
  }

  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    } else {
      const creep = Game.creeps[name];
      const job = jobs[creep.memory.job];
      Memory.counts[creep.memory.job]++;
      if (job) {
        job.run(creep);
      } else {
        creep.error(`cannot find ${creep.memory.job} instructions`);
      }
    }
  }

  for (const name in Game.spawns) {
    jobs.spawner.run(Game.spawns[name]);
  }
};
