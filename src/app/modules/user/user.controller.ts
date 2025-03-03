import { Request, Response } from 'express';

export const userController = {
  async getAll(req: Request, res: Response) {
    const data = {};
    res.json(data);
  },
};
