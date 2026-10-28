import axios from 'axios';
import type { Note, NewNote } from '../types'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios
    .get<Note[]>(baseUrl)
    .then(res => res.data)
}

const create = (obj: NewNote) => {
  return axios
    .post<Note>(baseUrl, obj)
    .then(res => res.data)
}

export default { getAll, create }