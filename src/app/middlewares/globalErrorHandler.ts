/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import sendResponse from '../libs/responseHandler';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  if (error.name === 'ValidationError')
    return sendResponse(res, {
      success: false,
      statusCode: error?.statusCode || StatusCodes.BAD_REQUEST,
      message: 'Input validation error',
      error,
      stack: error.stack,
    });
  if (error.name === 'CastError')
    return sendResponse(res, {
      success: false,
      statusCode: error?.statusCode || StatusCodes.NOT_ACCEPTABLE,
      message: 'Input type error',
      error,
      stack: error.stack,
    });
  if (error.code === 11000)
    return sendResponse(res, {
      success: false,
      statusCode: error?.statusCode || StatusCodes.NOT_ACCEPTABLE,
      message: 'Input contains duplicate data',
      error,
      stack: error.stack,
    });

  if (error.name === 'ZodError')
    return sendResponse(res, {
      success: false,
      statusCode: error?.statusCode || StatusCodes.BAD_REQUEST,
      message: error.issues[0].message,
      error: error.issues[0],
      stack: error.stack,
    });

  if (error.name === 'Error') {
    return sendResponse(res, {
      success: false,
      statusCode: error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      error,
      stack: error.stack,
    });
  }
  if (error.name === 'JsonWebTokenError')
    return sendResponse(res, {
      success: false,
      statusCode: error?.statusCode || StatusCodes.UNAUTHORIZED,
      message: error.message,
      error,
      stack: error.stack,
    });
  return sendResponse(res, {
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong',
    error,
    stack: error.stack,
  });
};
