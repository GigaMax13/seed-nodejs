import UserModel from '../models/UserModel';
import CustomError from '../helpers/CustomError';

export default class UserService {
  static post(data) {
    const {
      email,
    } = data;

    return UserModel.exist(email).then((exist) => {
      if (exist) {
        return Promise.reject(new CustomError(__('routes.user.post.409'), 409));
      }

      return UserModel.post(data).then((user) => {
        const {
          id_user: id,
        } = user;

        return { id };
      });
    });
  }

  static get(data) {
    return new Promise((resolve, reject) => {
      UserModel.get(data).then((result) => {
        if (result) {
          const {
            id_user: id,
            nm_user: name,
            nm_email: email,
            ts_created_at: created,
            ts_updated_at: updated,
            is_active: active,
          } = result;

          resolve({
            id,
            name,
            email,
            created,
            updated,
            active: !!active,
          });
        } else {
          reject(new CustomError(__('server.error.404'), 404));
        }
      }).catch(error => reject(error));
    });
  }

  static list(data) {
    return new Promise((resolve, reject) => {
      let { page, size } = data;

      page = Number(page || 1);
      size = Number(size || 10);

      UserModel.list({ page, size }).then((result) => {
        if (result) {
          const {
            users,
            total,
          } = result;

          resolve({
            data: users.map((user) => {
              const {
                id_user: id,
                nm_user: name,
                nm_email: email,
                ts_created_at: created,
                ts_updated_at: updated,
                is_active: active,
              } = user;

              return {
                id,
                name,
                email,
                created,
                updated,
                active: !!active,
              };
            }),
            page,
            size,
            total,
          });
        } else {
          reject(new CustomError(__('server.error.404'), 404));
        }
      }).catch(error => reject(error));
    });
  }

  static put(data) {
    return new Promise((resolve, reject) => {
      UserModel.put(data).then((result) => {
        if (result) {
          resolve();
        } else {
          reject(new CustomError(__('server.error.404'), 404));
        }
      }).catch((error) => {
        reject(new CustomError(__('server.error.404'), 404, error.stack));
      });
    });
  }

  static delete(data) {
    return new Promise((resolve, reject) => {
      UserModel.delete(data).then(() => resolve()).catch(() => {
        reject(new CustomError(__('server.error.404'), 404));
      });
    });
  }
}
