import { Response } from 'express';
import config from '../config';
import { IApiResponse } from '../interface';

const sendResponse = <T>(res: Response, response: IApiResponse<T>) => {
  const responseObj: IApiResponse<T> = {
    success: response.success,
    message: response.message,
    statusCode: response?.statusCode || 500,
  };

  if (response.data) {
    responseObj['data'] = response.data;
  }

  if (response.error && config.NODE_ENV === 'development') {
    responseObj['error'] = response.error;
    responseObj['stack'] = response.stack;
  }

  res.status(responseObj.statusCode || 500).json(responseObj);
};

export default sendResponse;
