import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../libs/responseHandler';

const notFound: RequestHandler = (req, res) => {
  return sendResponse(res, {
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Route not found',
  });
};

export default notFound;
