module.exports = {
  move: (creep, target, opts) => {
    creep.moveTo(target, { visualizePathStyle: {}, ...opts });
  }
};
