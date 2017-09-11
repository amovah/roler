/* eslint-disable */

const Roler = require('../build/index.js');
const { expect } = require('chai');

describe('#Roler', function() {

  describe('#new', function() {
    let roler = new Roler();
    let role = roler.new('guest');

    it('role should be added in role list', function() {
      expect(roler.roles.guest).to.not.be.null;
    });

    it('should return role', function() {
      expect(role.constructor.name).to.equal('Role');
    });
  });

  describe('#remove', function() {
    let roler = new Roler();

    it('a role should be removed from role list', function() {
      roler.new('guest');
      roler.remove('guest');

      expect(roler.roles.guest).to.be.undefined;
    });

    it('an array of roles should be removed from role list', function() {
      let roles = ['guest', 'everyone', 'admin'];

      for (let item of roles) {
        roler.new(item);
      }

      roler.remove(roles);

      for (let item of roles) {
        expect(roler.roles[item]).to.be.undefined;
      }
    });
  });

  describe('#get', function() {
    let roler = new Roler();

    roler.new('everyone');

    it('should return undefined with wrong name', function() {
      expect(roler.get('guest')).to.be.undefined;
      expect(roler.get('admin')).to.be.undefined;
    });

    it('should return a role', function() {
      expect(roler.get('everyone').constructor.name).to.equal('Role');
    });
  });

});

describe('#Role', function() {
  describe('#add', function() {
    let roler = new Roler();
    let admin = roler.new('admin');

    it('resource and perm should be added to list', function() {
      admin.add('blog', 'edit');
      admin.add('post', ['view', 'remove']);

      expect(admin.perms.blog).to.not.be.undefined;
      expect(admin.perms.post).to.not.be.undefined;
      expect(admin.perms.blog).to.have.lengthOf(1);
      expect(admin.perms.blog).to.have.members(['edit']);
      expect(admin.perms.post).to.have.lengthOf(2);
      expect(admin.perms.post).to.have.members(['view', 'remove']);
    });

    it('should return itself', function() {
      expect(admin.add('media', 'remove').constructor.name).to.equal('Role');
    });
  });

  describe('#isAllowed', function() {
    let roler = new Roler();
    let admin = roler.new('admin').add('posts', ['view', 'edit', 'remove']);

    it('when pass a permission', function() {
      expect(admin.isAllowed('posts', 'view')).to.be.true;
      expect(admin.isAllowed('posts', 'read')).to.be.false;
      expect(admin.isAllowed('posts', 'remove')).to.be.true;
    });

    it('when pass array of permissions', function() {
      expect(admin.isAllowed('posts', ['remove'])).to.be.true;
      expect(admin.isAllowed('posts', ['remove', 'view'])).to.be.true;
      expect(admin.isAllowed('posts', ['remove', 'read'])).to.be.false;
      expect(admin.isAllowed('posts', ['read'])).to.be.false;
    });
  });


  describe('#can', function() {
    let roler = new Roler();
    let admin = roler.new('admin').add('posts', ['view', 'edit', 'remove']);

    it('should return all resources and perms', function() {
      expect(admin.whatCanDo()).to.deep.equal({ posts: ['view', 'edit', 'remove'] });
    });
  });

  describe('#removeResource', function() {
    let roler = new Roler();

    it('should be removed from perm list', function() {
      let admin = roler.new('admin').add('blog', 'view');
      admin.removeResource('blog');
      expect(admin.perms.blog).to.be.undefined;
    });

    it('an array of perms should be removed from perm list', function() {
      let admin = roler.new('admin').add('blog', 'view').add('post', 'view').add('media', 'upload');
      admin.removeResource(['blog', 'post', 'media']);

      expect(admin.perms.post).to.be.undefined;
      expect(admin.perms.blog).to.be.undefined;
      expect(admin.perms.media).to.be.undefined;
    });

    it('should return itself', function() {
      let admin = roler.new('admin').add('blog', 'view');
      expect(admin.removeResource('blog').constructor.name).to.equal('Role');
    });
  });

  describe('#removePermission', function() {
    let roler = new Roler();
    let admin = roler.new('admin').add('blog', ['view', 'edit', 'remove', 'add', 'upload', 'download']);

    it('should be removed from perm list', function() {
      admin.removePermission('blog', 'view');
      expect(admin.perms.blog).to.deep.equal(['edit', 'remove', 'add', 'upload', 'download']);
    });

    it('an array of perms should be removed from perm list', function() {
      admin.removePermission('blog', ['view', 'nothing', 'remove', 'download']);
      expect(admin.perms.blog).to.deep.equal(['edit', 'add', 'upload']);
    });
  });
});
