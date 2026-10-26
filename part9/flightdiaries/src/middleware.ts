import express, { type Request, type Response, type NextFunction } from 'express';
import { NewEntrySchema } from './types.ts';

export const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};