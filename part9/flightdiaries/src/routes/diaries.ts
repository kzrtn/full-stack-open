import express, { type NextFunction, type Request, type Response } from 'express';
import { newDiaryParser } from '../middleware.ts';
import diaryService from '../services/diaryService.ts';
import { type DiaryEntry, type NewDiaryEntry, type NonSensitiveDiaryEntry } from '../types.ts';
import z from 'zod';

const router = express.Router();

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.send(data);
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  
  if (diary) {
    res.send(diary);
  } else {
    res.status(404);
  }
});

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;