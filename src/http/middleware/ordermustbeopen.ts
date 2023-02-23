import { Request, Response } from 'express';
import { Order } from '../../models/order';

const orderMustBeOpen = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  try {
    const order_id = req.params.id;
    const order = await new Order().show(order_id);
    if (order && order.status != 'completed') {
      next();
    } else {
      throw new Error('You can not add product to the closed or non-exist order');
    }
  } catch (error) {
    res.status(400).json({status: "failed", message: `${error}`});
  }
};

export { orderMustBeOpen };
