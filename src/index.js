function remove(array, item) {
  let index = array.indexOf(item);
  
  if (index === -1) {
    return array;
  }

  return [...array.slice(0, index), ...array.slice(index + 1)];
}

class Role {
  constructor() {
    this.perms = {};
  }

  add(resource, perm) {
    if (Array.isArray(perm)) {
      this.perms[resource] = perm;
    } else if (typeof perm === 'string') {
      this.perms[resource] = [perm];
    }

    return this;
  }

  isAllowed(resource, perm) {
    let perms = this.perms[resource];

    if (typeof perm === 'string') {
      perm = [perm];
    }
    
    if (typeof perms === 'undefined') {
     return false;
    }

    return perm.every(item => perms.includes(item));
  }

  whatCanDo() {
    return this.perms;
  }

  removeResource(resources) {
    if (typeof resources === 'string') {
      resources = [resources];
    }

    for (let resource of resources) {
      delete this.perms[resource];
    }

    return this;
  }

  removePermission(resource, permissions) {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }

    for (let permission of permissions) {
      this.perms[resource] = remove(this.perms[resource], permission);
    }

    return this;
  }
}

export default class {
  constructor() {
    this.roles = {};
  }

  new(name) {
    this.roles[name] = new Role();

    return this.roles[name];
  }

  remove(names) {
    if (typeof names === 'string') {
      names = [names];
    }

    for (let name of names) {
      delete this.roles[name];
    }
  }

  get(name) {
    return this.roles[name];
  }
}
