import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateResource =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (e) {
      next(e);
    }
  };
