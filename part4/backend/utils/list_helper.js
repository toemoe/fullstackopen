const User = require('../models/user')

const dummy = (blogs) => {
  if (blogs) { return 1 }
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { return null }
  return blogs.reduce((fav, curr) => curr.likes > fav.likes ? curr : fav, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return null }

  const counts = blogs.reduce((acc, curr) => {
    const author = curr.author
    acc.set(author, (acc.get(author) || 0) + 1)
    return acc
  }, new Map())

  let topAuthor = null
  let max = 0

  for (const [author, count] of counts) {
    if (count > max) {
      max = count
      topAuthor = author
    }
  }
  return { author: topAuthor, blogs: max }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return null }

  const likes = blogs.reduce((acc, curr) => {
    const author = curr.author
    acc.set(author, (acc.get(author) || 0) + curr.likes)
    return acc
  }, new Map())

  let topAuthor = null
  let max = 0

  for (const [author, count] of likes) {
    if (count > max) {
      max = count
      topAuthor = author
    }
  }
  return { author: topAuthor, likes: max }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, usersInDb }