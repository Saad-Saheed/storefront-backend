import { Request, Response } from 'express';
import { cartType, Order, orderType } from '../../models/order';

export class OrderController {
  //get all
  public async show(req: Request, res: Response) {
    try {
      const orderM = new Order();
      const torder = await orderM.show(req.params.id);
      if (!torder) res.status(404).json({status: "success", message: "Order Not Found!"});
      else res.status(200).json({status: "success", data: torder});
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }
  //create
  public async create(req: Request, res: Response) {
    try {
      // new order
      const neworder: orderType = {
        user_id: req.body.user_id,
        status: req.body.status,
      };
      const order = new Order();
      const orders = await order.create(neworder);
      res.status(200).json({ status: "success", message: 'Order Created Successfully', data: orders });
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }
  //addProduct
  public async addProduct(req: Request, res: Response) {
    try {
      // new order
      const neworder: cartType = {
        order_id: parseInt(req.params.id),
        product_id: req.body.product_id,
        quantity: req.body.quantity,
      };
      const order = new Order();
      const orderCart = await order.addProduct(neworder);
      res.status(200).json({
        status: "success",
        message: 'Product added to order cart successfully',
        data: orderCart,
      });
    } catch (error: unknown) {
      const err = error as string;
      res.status(400).json({status: "failed", message: err.toString()});
    }
  }
  //update
  public async update(req: Request, res: Response) {
    try {
      // update order
      const updateorder: orderType = {
        user_id: req.body.user_id,
        status: req.body.status
      };

      const orderM = new Order();
      const order = await orderM.update(req.params.id, updateorder);
      res
        .status(200)
        .json({ status: "success", message: 'Order Updated Successfully', data: order });
    } catch (error: unknown) {
      const err = error as string;
      res.status(500).json({status: "failed", message: err.toString()});
    }
  }
}
