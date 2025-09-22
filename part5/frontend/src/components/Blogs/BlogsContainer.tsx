import { useState, useEffect } from 'react'
import blogService from '../../services/blogs'
import type { BlogType } from '../../types/types'
import Blog from './Blog'
import type { LoginResponse } from '../../services/login'

interface BlogsContainerProps {
  user: LoginResponse
}

const BlogsContainer = ({ user }: BlogsContainerProps) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    if (!user) return
    const fetchBlogs = async () => {
      try {
        const blogsFromServer = await blogService.getAll()
        setBlogs(blogsFromServer)
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      }
    }

    fetchBlogs()
  }, [user])

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