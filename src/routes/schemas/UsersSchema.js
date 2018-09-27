import Joi from 'joi';
import RouteValidator from '../../middlewares/RouteValidator';

export default class UsersSchema extends RouteValidator {
  static get post() {
    const schema = {
      body: Joi.object().keys({
        email: Joi.string().required(),
        name: Joi.string().required(),
        pass: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get get() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get list() {
    const schema = {
      query: Joi.object().keys({
        page: Joi.number().integer().min(1),
        size: Joi.number().integer().min(10).max(10000),
      }),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }),
      body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string(),
      }).min(1),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }
}
