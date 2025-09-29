import blogService from '../../services/blogs'
import type { BlogType } from '../../types/types'
import React, { useState } from 'react'

interface CreateBlogProps {
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>
  showNotification: (message: string) => void
}

const CreateBlog = ({ setBlogs, showNotification }: CreateBlogProps) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const createNewBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(prevBlogs => [...prevBlogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      showNotification(`Blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      showNotification('Failed to create new blog')
      console.log('Failed to create new blog', error)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <p><b>Create new</b></p>
        <form onSubmit={createNewBlog}>
          <div>
            <label>title
              <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
            </label>
          </div>
          <div>
            <label>author
              <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
            </label>
          </div>
          <div>
            <label>url
              <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateBlog