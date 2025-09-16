const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
describe('most likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })

  test('sums likes per author and returns author with highest total', () => {
    const blogs = [
      { author: 'A', likes: 3 },
      { author: 'A', likes: 3 },
      { author: 'B', likes: 5 }
    ]
    const res = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(res, { author: 'A', likes: 6 })
  })
})