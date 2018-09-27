import UserService from '../services/UserService';
import CustomError from '../helpers/CustomError';

export default class UserController {
  static post(req, res) {
    UserService.post({ ...req.body, ...req.locals }).then((data) => {
      res.status(201).send({
        success: true,
        data,
      });
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static get(req, res) {
    UserService.get({ ...req.params, ...req.locals }).then((data) => {
      res.send({
        success: true,
        data,
      });
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static list(req, res) {
    UserService.list({ ...req.query, ...req.locals }).then((data) => {
      res.send({
        success: true,
        ...data,
      });
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static put(req, res) {
    UserService.put({ ...req.params, ...req.body, ...req.locals }).then(() => {
      res.status(204).send();
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }

  static delete(req, res) {
    UserService.delete({ ...req.params, ...req.locals }).then(() => {
      res.status(204).send();
    }).catch((err) => {
      CustomError.handler(res, err);
    });
  }
}
