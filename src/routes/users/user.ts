import express from 'express';
import { UserController } from '../../http/controllers/usercontroller';
import { authenticate } from '../../http/middleware/authenticate';
import { mustBeTheOwner } from '../../http/middleware/mustbetheowner';

const userRoutes = express.Router();
const userController = new UserController();

// create
userRoutes.post('/', userController.create);
// read all
userRoutes.get('/', authenticate, userController.index);
// read one
userRoutes.get('/:id', authenticate, userController.show);
// read this user's ACTIVE orders
userRoutes.get('/:id/active_orders', [authenticate, mustBeTheOwner], userController.activeOrders);
// read this user's COMPLETED orders
userRoutes.get(
  '/:id/completed_orders',
  [authenticate, mustBeTheOwner],
  userController.completedOrders
);

export default userRoutes;
