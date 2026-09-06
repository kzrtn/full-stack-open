const baseUrl = 'http://localhost:3001/notes'

export const getNotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Failed to fetch notes')
  return await response.json()
}

export const createNote = async (newNote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote)
  }
  const res = await fetch(baseUrl, options)
  if (!res.ok) throw new Error('Failed to create note')
  return await res.json()
}

export const updateNote = async (updatedNote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote)
  }
  const res = await fetch(`${baseUrl}/${updatedNote.id}`, options)
  if (!res.ok) {
    throw new Error('Failed to update note')
  }
  return await res.json()
}