import { type NewDiaryEntry, NewEntrySchema } from '../types.ts';

export const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};