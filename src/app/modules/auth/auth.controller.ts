import { RequestHandler } from 'express';

export const handleRegistration: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;

    res.json(payload);
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
