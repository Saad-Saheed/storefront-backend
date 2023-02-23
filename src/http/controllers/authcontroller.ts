import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Auth } from '../services/auth';

export class AuthController {
  // login
  public async login(req: Request, res: Response) {
    try {
      const auth = new Auth();
      const user = await auth.login(
        req.body.username,
        req.body.password
      );
      if (user) {
        const token = jwt.sign(
          { user: user },
          process.env.TOKEN_SECRET as string
        );
        res.status(200).json({
          status: "success",
          message: 'User login succesfully',
          data: user,
          token: token,
        });
      } else {
        res.status(400).json({status: "failed", message: 'Invalid credentials' });
      }
    } catch (error: unknown) {
      const err = error as string;
      res.json({status: "failed", message: err.toString()});
    }
  }
}