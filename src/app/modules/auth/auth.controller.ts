import { RequestHandler } from 'express';
import { User } from '../user/user.model';
import sendResponse from '../../libs/responseHandler';
import { StatusCodes } from 'http-status-codes';

export const handleRegistration: RequestHandler = async (req, res, next) => {
  try {
    const userExist = await User.checkUserExistByEmail(req.body.email);

    if (userExist) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: 'User already exist',
      });
    }

    const response = {
      accessToken: '',
      refreshToken: '',
    };

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

    res.json(payload);
  } catch (error) {
    console.error(error);
  }
};

export const AuthController = {
  handleRegistration,
  handleLogin,
};
