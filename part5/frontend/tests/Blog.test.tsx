import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blogs/Blog'
import CreateBlog from '../src/components/Blogs/CreateBlog'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import blogService from '../src/services/blogs'

vi.mock('../src/services/blogs') // мокируем весь сервис

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Blog Component', () => {
  const blog = {
    id: '1',
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'https://example.com',
    likes: 100,
    user: { name: 'Tester' }
  }

  test('renders blog', () => {
    render(<Blog blog={blog} onDelete={() => {}}/>)
    expect(screen.getByText('Blog Title Blog Author')).toBeInTheDocument()

    // Test that the URL and likes are not displayed initially
    const urlElement = screen.queryByText('https://example.com')
    const likesElement = screen.queryByText('likes: 100')

    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })

  test('clicking like button twice calls like handler twice', async () => {
    const mockLike = vi.fn() // мокируем функцию onLike
    render(<Blog blog={{ ...blog, likes: 100 }} onLike={mockLike} onDelete={() => {}} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLike).toHaveBeenCalledTimes(2)
  })

  test('clicking like button twice increases likes shown by 2', async () => {
    render(<Blog blog={{ ...blog, likes: 100 }} onDelete={() => {}} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(screen.getByText(/likes:\s*100/)).toBeInTheDocument()
  })

  test('form calls setBlogs with correct data', async () => {
    const setBlogs = vi.fn()
    const showNotification = vi.fn()
    const user = userEvent.setup()
    ;(blogService.create as vi.Mock).mockResolvedValue({
      title: 'My Blog',
      author: 'Tester',
      url: 'https://example.com',
      likes: 0,
      id: '1',
    })
    render(<CreateBlog setBlogs={setBlogs} showNotification={showNotification} />)
    await user.click(screen.getByText('Create new blog'))
    await user.type(screen.getByLabelText(/title/i), 'My Blog')
    await user.type(screen.getByLabelText(/author/i), 'Tester')
    await user.type(screen.getByLabelText(/url/i), 'https://example.com')
    await user.click(screen.getByText('create'))
    expect(blogService.create).toHaveBeenCalledWith({
      title: 'My Blog',
      author: 'Tester',
      url: 'https://example.com',
      likes: 0,
    })
    expect(setBlogs).toHaveBeenCalledTimes(1)
    expect(showNotification).toHaveBeenCalledWith('Blog My Blog by Tester added')
  })
})