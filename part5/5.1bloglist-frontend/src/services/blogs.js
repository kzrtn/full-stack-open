import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const addLike = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return res.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, setToken, create, addLike }