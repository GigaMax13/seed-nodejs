import uuid from 'uuid/v1';

import db from '../config/db';
import RedundancyPolicy from '../helpers/RedundancyPolicy';

const UsersLogin = db.Model.extend({
  tableName: 'seed.cfg_users_login',
  idAttribute: 'sk_users_login',
});

const Users = db.Model.extend({
  tableName: 'seed.cfg_users',
  idAttribute: 'sk_user',
  login() {
    return this.hasMany(UsersLogin, 'id_user', 'id_user');
  },
}, {
  dependents: ['login'],
});

export default class UsersModel {
  static post(data) {
    const {
      name,
      email,
      pass,
    } = data;
    const id = uuid();

    return Users.forge({
      id_user: id,
      nm_user: name,
      nm_email: email,
    }).save().then((userData) => {
      const salt = RedundancyPolicy.sha256(id);

      return userData.related('login').create({
        cd_salt: salt,
        cd_hash: RedundancyPolicy.sha256(pass, salt),
      });
    }).then((userData) => {
      return userData ? userData.toJSON() : null;
    });
  }

  static get({ userId }) {
    return new Users().where({
      id_user: userId,
    }).fetch().then(data => (data ? data.toJSON() : null));
  }

  static list({ page, size: pageSize }) {
    return new Users().where({
      is_active: true,
    }).orderBy('ts_created_at')
      .fetchPage({
        page,
        pageSize,
        withRelated: ['login', {
          login: query => query.where({
            is_active: 1,
          })
            .orderBy('ts_created_at', 'desc')
            .limit(1),
        }],
      })
      .then((data) => {
        if (data) {
          const users = data.toJSON();

          if (users.length) {
            const { pagination: { rowCount: total } } = data;

            return {
              users,
              total,
            };
          }
        }

        return null;
      });
  }

  static put(data) {
    const {
      userId,
      name,
      email,
    } = data;
    let newUserData = {};

    if (name) {
      newUserData = { nm_user: name };
    }

    if (email) {
      newUserData = {
        ...newUserData,
        nm_email: email,
      };
    }

    return Users.forge().where({
      id_user: userId,
    }).save(newUserData, { method: 'update' });
  }

  static delete({ userId }) {
    return new UsersLogin().where({ id_user: userId }).destroy().then(() => {
      return new Users().where({ id_user: userId }).destroy();
    });
  }

  static exist(email) {
    return new Users().where({
      nm_email: email,
      is_active: 1,
    }).fetch().then(data => !!data);
  }
}
