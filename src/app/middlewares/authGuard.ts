import { StatusCodes } from 'http-status-codes';
import sendResponse from '../libs/responseHandler';
import { TUserRole } from '../modules/user/user.interface';
import { verifyToken } from '../libs/token';
import config from '../config';
import { User } from '../modules/user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const AuthGuard =
  (roles: TUserRole[] = []) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenWithBearer = req.headers.authorization;

      if (!tokenWithBearer) {
        return sendResponse(res, {
          success: false,
          statusCode: StatusCodes.UNAUTHORIZED,
          message: 'You are not authorized to access this resource.',
        });
      }

      const token = tokenWithBearer.split(' ')[1];

      const decoded = verifyToken(
        token,
        config.access_token_secret as string,
      ) as JwtPayload;
      console.log(decoded);

      if (!decoded) {
        return sendResponse(res, {
          success: false,
          statusCode: StatusCodes.UNAUTHORIZED,
          message: 'You are not authorized to access this resource.',
        });
      }

      const userExist = await User.checkUserExistById(decoded._id);

      if (!userExist) {
        return sendResponse(res, {
          success: false,
          statusCode: StatusCodes.UNAUTHORIZED,
          message: 'User does not exist.',
        });
      }

      if (!userExist.status) {
        return sendResponse(res, {
          success: false,
          statusCode: StatusCodes.UNAUTHORIZED,
          message: 'User is not active.',
        });
      }

      if (roles.length && !roles.includes(userExist.role)) {
        return sendResponse(res, {
          success: false,
          statusCode: StatusCodes.UNAUTHORIZED,
          message: 'You are not authorized to access this resource.',
        });
      }

      req.user = decoded as JwtPayload;

      next();
    } catch (error) {
      next(error);
    }
  };
