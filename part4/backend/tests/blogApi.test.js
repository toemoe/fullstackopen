const { test, before, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

before(async () => {
  const url = process.env.MONGODB_URI
  await mongoose.connect(url)
})

after(async () => {
  await mongoose.connection.close(() => {
    console.log('connection closed')
  })
})

describe('get', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    response.body.forEach(blog => {
      assert.ok(blog.id, 'id is defined')
    })
  })
})

describe('post', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 1
    }
    const response = await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body.id, 'id is defined')
    assert.deepStrictEqual(response.body.title, newBlog.title)
    assert.deepStrictEqual(response.body.author, newBlog.author)
    assert.deepStrictEqual(response.body.url, newBlog.url)
    assert.deepStrictEqual(response.body.likes, newBlog.likes)
  })

  test('blog without likes is added with likes 0', async () => {
    const newBlog = {
      title: 'test',
      author: 'test',
      url: 'test'
    }

    const response = await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body.id, 'id is defined')
    assert.deepStrictEqual(response.body.title, newBlog.title)
    assert.deepStrictEqual(response.body.author, newBlog.author)
    assert.deepStrictEqual(response.body.url, newBlog.url)
    assert.deepStrictEqual(response.body.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'test1',
      url: 'test1',
    }
    const response = await api.post('/api/blogs').send(newBlog).expect(400)
    assert.deepStrictEqual(response.body.error, 'title or url missing')
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      author: 'test1',
      title: 'test1',
    }
    const response = await api.post('/api/blogs').send(newBlog).expect(400)
    assert.deepStrictEqual(response.body.error, 'title or url missing')
  })
})

describe('delete', () => {
  test('blog can be deleted', async () => {
    const newBlog = new Blog({ title: 'To delete', author: 'Test', url: 'test.com', likes: 0 })
    const savedBlog = await newBlog.save()
    await api.delete(`/api/blogs/${savedBlog._id}`).expect(204)

    const blogsAttEnd = await Blog.find({})
    const ids = blogsAttEnd.map(blog => blog.id)
    assert(!ids.includes(savedBlog._id.toString()))
  })
})

describe('put', () => {
  test('blog can be updated', async () => {
    const newBlog = new Blog({ title: 'To update', author: 'Test', url: 'test.com', likes: 0 })
    const savedBlog = await newBlog.save()
    const updatedBlog = { title: 'Updated', author: 'Test', url: 'test.com', likes: 1 }
    await api.put(`/api/blogs/${savedBlog._id}`).send(updatedBlog).expect(200)
  })
})