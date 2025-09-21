import { useState, useEffect } from 'react'
import blogService from '../../services/blogs'
import type { BlogType } from '../../types/types'
import Blog from './Blog'

const BlogsContainer = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogsContainer;