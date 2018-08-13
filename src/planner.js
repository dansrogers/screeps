
module.exports.planRoles = function() {
  let config = {
    "harvester": 2,
    "builder": 1,
    "upgrader": 1,
    "bad": 0,
  };
  let byRole = new Map();
  _.each(Game.creeps, (creep) => {
    if (!creep.memory.role) {
      creep.memory.role = "bad";
    }
    if (!byRole.has(creep.memory.role)) {
      byRole.set(creep.memory.role, []);
    }
    byRole.get(creep.memory.role).push(creep);
    if (!config[creep.memory.role]) {
      config[creep.memory.role] = 0;
    }
  });
  _.each(config, (plan, role) => {
    if (!byRole.has(role)) {
      byRole.set(role, []);
    }
  });


  _.each(config, (plan, role) => {
    let creeps = byRole.get(role);
    if (creeps.length != config[role]) {
      console.log('planning ' + role + ' found ' + creeps.length + ' planning ' + config[role]);
    }
    if(creeps.length < config[role]) {
      let newName = role + Game.time;
      console.log('Spawning new ' + role + ': ' + newName);
      Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
        {memory: {role: role}});
    }
    if(creeps.length > config[role]) {
      console.log('Killing excess ' + role);
      for (let i=config[role];i<creeps.length;i++) {
        creeps[i].suicide();
      }
    }

  });
};
