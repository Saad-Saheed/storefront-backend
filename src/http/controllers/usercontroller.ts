import { Request, Response } from 'express';
import { User, UserType } from '../../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { PASSWORD_SALT, SALT_ROUNDS } = process.env;

export class UserController {
  // index
  public async index(_req: Request, res: Response) {
    try {
      const userModel = new User();
      const users = await userModel.index();
      if (!users) res.status(404).json({status: "success", message: 'Users Not Found!'});
      else res.status(200).json({status: "success", data: users });
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }

  // show
  public async show(req: Request, res: Response) {
    try {
      const userModel = new User();
      const user = await userModel.show(req.params.id);
      if (!user) res.status(404).json({ status: "failed", message: 'User Not Found!' });
      else res.status(200).json({ status: "success", data: user});
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }
  // read this user's active orders
  public async activeOrders(req: Request, res: Response) {
    try {
      const userModel = new User();
      const orders = await userModel.activeOrders(req.params.id);
      if (!orders.length) res.status(404).json({status: "failed", message: 'active orders are not found for this user'});
      else res.status(200).json({ status: "success", data: orders });
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }
  // read this user's active orders
  public async completedOrders(req: Request, res: Response) {
    try {
      const userModel = new User();
      const orders = await userModel.completedOrders(req.params.id);
      if (!orders.length) res.status(404).json({status: "failed", message: 'completed orders are not found for this user' });
      else res.status(200).json({ status: "success", data: orders });
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }

  public async create(req: Request, res: Response) {
    try {
      // hash password
      const hashed_password = bcrypt.hashSync(
        req.body.password + (PASSWORD_SALT as string),
        parseInt(SALT_ROUNDS as string)
      );

      // new user data
      const newuser: UserType = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashed_password,
      };

      // create user
      const userModel = new User();
      const user = await userModel.create(newuser);

      // generate token
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );

      res.status(200).json({
        status: "success",
        message: 'User Created Successfully',
        data: { user: user, token: token },
      });
    } catch (error: unknown) {
      const err = error as string;
      res.status(400).json({status: "failed", message: err.toString()});
    }
  }
}
