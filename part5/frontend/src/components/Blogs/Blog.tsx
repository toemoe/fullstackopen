import { useState } from 'react'
import blogService from '../../services/blogs'
import type { BlogType } from '../../types/types.ts'

interface BlogProps {
  blog: BlogType
  onDelete: (id: string) => void
}

const Blog = ({ blog, onDelete }: BlogProps) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState<number>(blog.likes ?? 0)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: likes + 1 }
      const savedBlog = await blogService.update(blog.id, updatedBlog)
      setLikes(savedBlog.likes ?? 0)
    } catch (error) { console.error('Failed to liked blog', error) }
  }

  const handleDelete = async () => {
    try {
      const isConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if (!isConfirmed) return

      await blogService.deleteBlog(blog.id)
      onDelete(blog.id)
    } catch (error) { console.error('Failed to delete blog ', error)}
  }



  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        title: {blog.title} <button onClick={toggleVisibility}>Hide</button> <br />
        author: {blog.author} <br />
        url: {blog.url} <br />
        likes: {likes} <button onClick={handleLike}>like</button> <br />
        added by {blog.user
          ? typeof blog.user === 'string'
            ? blog.user
            : blog.user.name
          : 'unknown'} <br />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Blog