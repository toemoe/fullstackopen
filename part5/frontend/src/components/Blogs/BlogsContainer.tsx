import { useState, useEffect } from 'react'
import blogService from '../../services/blogs'
import type { BlogType } from '../../types/types'
import Blog from './Blog'
import type { LoginResponse } from '../../services/login'
import CreateBlog from './CreateBlog'

interface BlogsContainerProps {
  user: LoginResponse
  showNotification: (message: string) => void
}

const BlogsContainer = ({ user, showNotification }: BlogsContainerProps) => {
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    if (!user) return
    const fetchBlogs = async () => {
      try {
        const blogsFromServer = await blogService.getAll()
        setBlogs(blogsFromServer)
      } catch (error) {
        console.error('Failed to fetch blogs', error)
      }
    }

    fetchBlogs()
  }, [user])

  const HandleDeleteBlog = async (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div>
      <CreateBlog setBlogs={setBlogs} showNotification={showNotification} />
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} onDelete={HandleDeleteBlog}/>
        )}
    </div>
  )
}

export default BlogsContainer