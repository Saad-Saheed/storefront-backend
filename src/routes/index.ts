import express, { Request, Response } from 'express';
import { AuthController } from '../http/controllers/authcontroller';
import { categoryProducts, fiveMostPorpular } from '../http/controllers/dashboardcontroller';
import orderRoutes from './orders/order';
import productRoutes from './products/product';
import userRoutes from './users/user';

const auth = new AuthController();

// link routes
const routes = express.Router();
routes.use('/orders', orderRoutes);
routes.use('/products', productRoutes);
routes.use('/users', userRoutes);

// homepage route
routes.get('/', (_req: Request, res: Response) => {
  res.status(200).json({status: "success", message: 'welocme to StoreFront Backend'});
});
// login route
routes.post('/login', auth.login);
// get five most porpular products with their order info
routes.get('/five_most_porpular', fiveMostPorpular);
// get all product from this category
routes.get('/categories/:category/products', categoryProducts);

export default routes;
