import express from 'express';

import { UsersSchema } from './schemas/UsersSchema';
import { UsersController } from '../controllers/UsersController';

const Users = express.Router({ mergeParams: true });

/* POST /user */
Users.post('/', UsersSchema.post, UsersController.post);

/* GET /user/:userId */
Users.get('/:userId', UsersSchema.get, UsersController.get);

/* GET /user */
Users.get('/', UsersSchema.list, UsersController.list);

/* PUT /user/:userId */
Users.put('/:userId', UsersSchema.put, UsersController.put);

/* DELETE /user/:userId */
Users.delete('/:userId', UsersSchema.delete, UsersController.delete);

export { Users };
