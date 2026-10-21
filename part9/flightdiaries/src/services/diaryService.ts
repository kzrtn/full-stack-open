import diaryData from '../../data/entries.json' with { type: "json"};

const getEntries = () => {
  return diaryData;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};