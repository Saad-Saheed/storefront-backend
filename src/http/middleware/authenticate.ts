import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  try {
    let token = '';
    const authorizationHeader = req.headers.authorization as string;
    if (authorizationHeader) token = authorizationHeader.split(' ')[1];
    const secret = process.env.TOKEN_SECRET as string;

    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401).json({status: "failed", message: `Access denied: ${error}`});
  }
};

export { authenticate };
