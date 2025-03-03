import { Request, Response } from 'express';

export const handleRegistration = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    res.json(payload);
  } catch (error) {
    console.error(error);
  }
};
export const handleLogin = async (req: Request, res: Response) => {
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
