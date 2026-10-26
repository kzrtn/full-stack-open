import { z } from 'zod';
import { type NewDiaryEntry, Visibility, Weather } from '../types.ts';

export const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)) {
    throw new Error('Incorrect data: some fields are missing');
  }
  
  const newEntry: NewDiaryEntry = {
    comment: z.string().optional().parse(object.comment),
    date: z.iso.date().parse(object.date),
    weather: z.enum(Weather).parse(object.weather),
    visibility: z.enum(Visibility).parse(object.visibility)
  };
  return newEntry;
};