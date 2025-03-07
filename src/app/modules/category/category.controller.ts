import { RequestHandler } from 'express';
import { CategoryService } from './category.service';
import sendResponse from '../../libs/responseHandler';
import { StatusCodes } from 'http-status-codes';
import { TQuery } from '../../interface';

const handleCreateCategory: RequestHandler = async (req, res, next) => {
  try {
    const response = await CategoryService.createCategoryIntoDb(req.body);

    if (!response) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Not able to create category.',
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Category created successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateCreateCategory: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const response = await CategoryService.updateCategoryIntoDb(req.body, _id);
    console.log(response);

    if (!response) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Not able to update category.',
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Category updated successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const { status = 'all' } = req.query;

    const query: TQuery = {};
    if (status !== 'all') {
      query['status'] = status;
    }

    const response = await CategoryService.findAllCategoriesFromDb(query);

    if (!response) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Not able to fetch categories.',
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Categories fetched successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  handleCreateCategory,
  updateCreateCategory,
  getAllCategories,
};
