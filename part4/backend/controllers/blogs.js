const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  }).catch(error => { next(error) })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id).then(blog => {
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  }).catch(error => { next(error) })
})

blogsRouter.post('/', (request, response, next) => {
  const { title, url, author, likes } = request.body
  if (!title || !url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog({ title, url, author, likes })

  blog.save().then(result => {
    response.status(201).json(result)
  }).catch(error => { next(error) })
})


blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  const updatedFields = {}
  if (title !== undefined) { updatedFields.title = title }
  if (author !== undefined) { updatedFields.author = author }
  if (url !== undefined) { updatedFields.url = url }
  if (likes !== undefined) { updatedFields.likes = likes }

  if (Object.keys(updatedFields).length === 0) {
    return response.status(400).json({ error: 'at least one field must be updated' })
  }

  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedFields,
      { new: true, runValidators: true, context: 'query' },
    )
    if (updateBlog) {
      response.json(updateBlog)
    } else { response.status(404).json({ error: 'Not found' })}
  } catch (error) { next(error) }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id)
    if (result) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'blog not found' })
    }
  } catch (error) { next(error) }
})

module.exports = blogsRouter