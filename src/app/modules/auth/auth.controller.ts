import { RequestHandler } from 'express';
import { User } from '../user/user.model';
import sendResponse from '../../libs/responseHandler';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../../libs/token';
import config from '../../config';
import { UserService } from '../user/user.service';

export const handleRegistration: RequestHandler = async (req, res, next) => {
  try {
    const userExist = await User.checkUserExistByEmail(req.body.email);

    if (userExist) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'User already exist.',
      });
    }

    const user = await UserService.createUserIntoDb(req.body);

    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Not able to create user.',
      });
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...rest } = user.toObject();

    const jwtPayload = {
      _id: rest._id,
      email: rest.email,
      role: rest.role,
    };

    const accessToken = generateToken(
      jwtPayload,
      config.access_token_secret as string,
      config.access_token_expiry as string,
    );

    const refreshToken = generateToken(
      jwtPayload,
      config.refresh_token_secret as string,
      config.refresh_token_expiry as string,
    );

    const response = {
      accessToken,
      refreshToken,
    };

    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'User created successfully',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;

    const user = await User.checkUserExistByEmail(payload.email);

    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User does not exist. Please register first.',
      });
    }

    if (!user.status) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'User is not active.',
      });
    }

    const passwordMatch = await User.isPasswordMatched(
      payload.password,
      user.password,
    );
    console.log({ passwordMatch });

    if (!passwordMatch) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Invalid credentials.',
      });
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...rest } = user.toObject();

    const jwtPayload = {
      _id: rest._id,
      email: rest.email,
      role: rest.role,
    };

    const accessToken = generateToken(
      jwtPayload,
      config.access_token_secret as string,
      config.access_token_expiry as string,
    );

    const refreshToken = generateToken(
      jwtPayload,
      config.refresh_token_secret as string,
      config.refresh_token_expiry as string,
    );

    const response = {
      user: rest,
      accessToken,
      refreshToken,
    };

    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User logged in successfully',
      data: response,
    });
  } catch (error) {
    console.error(error);
  }
};

export const AuthController = {
  handleRegistration,
  handleLogin,
};
