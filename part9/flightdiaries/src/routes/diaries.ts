import express, { type Response } from 'express';
import diaryService from '../services/diaryService.ts';
import type { NonSensitiveDiaryEntry } from '../types.ts';
import { parseNewDiaryEntry } from '../utils/utils.ts';
import z from 'zod';

const router = express.Router();

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

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = parseNewDiaryEntry(req.body);
    res.json(newDiaryEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;