const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
describe('most blogs', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('when list has only one blog equals the blog', () => {
    const blogs = [
      { author: 'A', likes: 3 }
    ]
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      author: 'A',
      likes: 3
    })
  })

  test('when list has many blogs equals the blog with most likes', () => {
    const blogs = [
      { author: 'A', likes: 3 },
      { author: 'B', likes: 2 },
      { author: 'C', likes: 1 },
      { author: 'D', likes: 4 },
    ]

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      author: 'D',
      likes: 4
    })
  })

  test('when there is a tie, returns the first author who reached the maximum', () => {
    const blogs = [
      { author: 'First' },
      { author: 'Second' },
      { author: 'First' },
      { author: 'Second' }
    ]

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: 'First',
      blogs: 2
    })
  })



})