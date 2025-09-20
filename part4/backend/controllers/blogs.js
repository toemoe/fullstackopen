const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) { next(error) }
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

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const { title, url, author, likes } = request.body
    if (!title || !url) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    const user = request.user
    const blog = new Blog({
      title,
      url,
      author,
      likes: likes || 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
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

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(401).json({ error: 'not authorized' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) { next(error) }
})

module.exports = blogsRouter