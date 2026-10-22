import diaryData from '../../data/entries.json' with { type: "json" };
import type { DiaryEntry, NonSensitiveDiaryEntry } from '../types.ts';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({    
    id,    
    date,
    weather,
    visibility,
  }));
}

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => Number(d.id) === id);
  return entry;
}

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};