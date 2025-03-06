import { RequestHandler } from 'express';
import { UserService } from './user.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../libs/responseHandler';
import { TQuery } from '../../interface';

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const { status = 'all', search = '' } = req.query;
    const query: TQuery = {};

    if (status !== 'all') {
      query['status'] = status;
    }

    if (search) {
      query['$or'] = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await UserService.findAllUsersFromDb(query);

    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
};
