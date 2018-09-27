import express from 'express';

import UsersSchema from './schemas/UsersSchema';
import UsersController from '../controllers/UsersController';

const router = express.Router({ mergeParams: true });

/* POST /user */
router.post('/', UsersSchema.post, UsersController.post);

/* GET /user/:userId */
router.get('/:userId', UsersSchema.get, UsersController.get);

/* GET /user */
router.get('/', UsersSchema.list, UsersController.list);

/* PUT /user/:userId */
router.put('/:userId', UsersSchema.put, UsersController.put);

/* DELETE /user/:userId */
router.delete('/:userId', UsersSchema.delete, UsersController.delete);

export default router;
