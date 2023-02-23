import express from 'express';
import { ProductController } from '../../http/controllers/productcontroller';
import { authenticate } from '../../http/middleware/authenticate';

const productRoutes = express.Router();
const productController = new ProductController();

// create
productRoutes.post('/', authenticate, productController.create);
// read all
productRoutes.get('/', productController.index);
// read one
productRoutes.get('/:id', productController.show);
// update
productRoutes.put('/:id', authenticate, productController.update);

export default productRoutes;
