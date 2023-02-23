import express from 'express';
import { OrderController } from '../../http/controllers/ordercontroller';
import { authenticate } from '../../http/middleware/authenticate';
import { orderMustBeOpen } from '../../http/middleware/ordermustbeopen';

const orderRoutes = express.Router();
const orderController = new OrderController();

// create
orderRoutes.post('/', orderController.create);
// read one
orderRoutes.get('/:id', orderController.show);
// update
orderRoutes.put('/:id', authenticate, orderController.update);
// addproduct
orderRoutes.post('/:id/products', orderMustBeOpen, orderController.addProduct);

export default orderRoutes;
