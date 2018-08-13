var debugLogging = require('logging_debug');

var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          let err = creep.moveTo(targets[0], {
            visualizePathStyle: {
              stroke: '#ffffff',
            },
          });
          if (err !== OK) {
            console.log("moveTo failed for " + creep.name + " " + debugLogging.stringError(err));
          }

        }
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        let err = creep.moveTo(sources[0], {
          visualizePathStyle: {
            stroke: '#ffaa00',
          },
        });
        if (err !== OK) {
          console.log("moveTo failed for " + creep.name + " " + debugLogging.stringError(err));
        }
      }

    }
  },
};

module.exports = roleBuilder;
