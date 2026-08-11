const assert = require('node:assert')
const { describe, test, beforeEach, after } = require('node:test')

const Blog = require('../models/blog.js')
const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

const sampleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(sampleBlogs)
})

describe('viewing blogs', () => {
  test('returns correct amount of blogs', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, sampleBlogs.length)
  })

  test('unique identifier property of blog posts is named id', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    for (const blog of res.body) {
      assert(blog?.id)
    }
  })
})

describe('making blog posts', () => {
  test('able to create a new blog post', async () => {
    const newBlog =   {
      id: "123456789",
      title: "This is a new blog post",
      author: "Test author",
      url: "https://www.google.com/",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, sampleBlogs.length + 1)
  })

  test('if likes is missing from post request, it defaults to 0', async () => {
    const newBlog = {
      title: "test post",
      author: "Test author",
      url: "https://www.google.com/",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = res.body.find(blog => blog.title == 'test post')
    assert.strictEqual(returnedBlog.likes, 0)
  })

  test('response status 400 when blog is missing title', async () => {
    const newBlog = {
      author: "wow",
      url: "https://www.kfc.com",
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('response status 400 when blog is missing url', async () => {
    const newBlog = {
      title: "my title",
      author: "wow",
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blog posts', () => {
  test('response status 204 for successful single deletion', async () => {
    const deleteBlog = {
      id: "5a422a851b54a676234d17f7",
    }

    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .expect(204)
    
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, sampleBlogs.length - 1)
  })

  test('response status 400 if blog does not exist', async () => {
    const deleteBlog = {
      id: "123",
    }

    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .expect(400)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, sampleBlogs.length)
  })

  test('response status 404 if id is not a valid ObjectId', async () => {
    const deleteBlog = {
      id: 123,
    }

    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .expect(400)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, sampleBlogs.length)
  })
})

describe('updating blog posts', () => {
  test('update single post', async () => {
    const postToUpdate = {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 8,
    }

    await api
      .put(`/api/blogs/`)
      .set('Content-Type', 'application/json')
      .send(postToUpdate)
      .expect(200)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(postToUpdate, res.body[0])
  })

  test('response status 400 when blog does not exist', async () => {
    const correctPost = {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    const postToUpdate = {
      id: "123123123",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 8
    }

    await api
      .put(`/api/blogs/`)
      .set('Content-Type', 'application/json')
      .send(postToUpdate)
      .expect(400)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(correctPost, res.body[0])
  })

  test('response status 404 when id is not a valid ObjectId', async () => {
    const correctPost = {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    await api
      .put(`/api/blogs/`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(404)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(correctPost, res.body[0])
  })
})

after(async () => {
  await mongoose.connection.close()
})