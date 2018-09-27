import express from 'express';

import UserSchema from './schemas/UserSchema';
import UserController from '../controllers/UserController';

const router = express.Router({ mergeParams: true });

/* POST /user */
router.post('/', UserSchema.post, UserController.post);

/* GET /user/:userId */
router.get('/:userId', UserSchema.get, UserController.get);

/* GET /user */
router.get('/', UserSchema.list, UserController.list);

/* PUT /user/:userId */
router.put('/:userId', UserSchema.put, UserController.put);

/* DELETE /user/:userId */
router.delete('/:userId', UserSchema.delete, UserController.delete);

export default router;
