import { UsersService } from '../services/UsersService';
import { CustomError } from '../helpers';

class UsersController {
  static post(req, res) {
    UsersService.post({ ...req.body, ...req.locals }).then((data) => {
      res.status(201).send({
        success: true,
        data,
      });
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static get(req, res) {
    UsersService.get({ ...req.params, ...req.locals }).then((data) => {
      res.send({
        success: true,
        data,
      });
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static list(req, res) {
    UsersService.list({ ...req.query, ...req.locals }).then((data) => {
      res.send({
        success: true,
        ...data,
      });
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static put(req, res) {
    UsersService.put({ ...req.params, ...req.body, ...req.locals }).then(() => {
      res.status(204).send();
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static delete(req, res) {
    UsersService.delete({ ...req.params, ...req.locals }).then(() => {
      res.status(204).send();
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }
}

export { UsersController };
