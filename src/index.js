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
}

export default class {
  constructor() {
    this.roles = {};
  }

  new(name) {
    this.roles[name] = new Role();

    return this.roles[name];
  }

  remove(name) {
    this.roles[name] = null;
  }

  isAllowed(name, resource, perm) {
    let perms = this.roles[name].perms[resource];

    if (typeof perm === 'string') {
      perm = [perm];
    }

    return perm.every(item => perms.includes(item));
  }
}
