const harvester = require('role.harvester');

module.exports.loop = () => {
  for (const name in Game.creeps) {
    harvester.run(Game.creeps[name]);
  }
}
