const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when a list has only one blog equals the likes of that', () => {
    const blogs = [{
      "title": "blog 1",
      "author": "Me",
      "url": "whatisthisurl",
      "likes": 1
    }]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 1)
  })

  test('of bigger list is calculated correctly', () => {
    const blogs = [{
      "title": "blog 1",
      "author": "Me",
      "url": "whatisthisurl",
      "likes": 1
    }, {
      "title": "blog 2",
      "author": "Me",
      "url": "whatisthisurl",
      "likes": 1
    }, {
      "title": "blog 3",
      "author": "Me",
      "url": "whatisthisurl",
      "likes": 1
    }]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 3)
  })
})