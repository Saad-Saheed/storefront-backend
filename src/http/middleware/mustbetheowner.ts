import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const mustBeTheOwner = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  try {
    let token = '';
    const authorizationHeader = req.headers.authorization as string;

    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
      const decode = jwt.decode(token);
      
      if (
        decode &&
        typeof(decode) == 'object' &&
        decode['user']['id'] == req.params.id
      ) {
        next();
      }else{
        throw new Error(
          'Access denied, you do not have the right to perform this action'
        );
      }
    }else{
      throw new Error(
        'Access denied, you do not have the right to perform this action'
      );
    }

    
  } catch (error) {
    res.status(403).json({status: "failed", message: `${error}`});
  }
};

export { mustBeTheOwner };
