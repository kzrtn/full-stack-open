import { test, expect, vi, describe, beforeEach } from 'vitest'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const mockUpdateBlog = vi.fn()
const mockDeleteBlog = vi.fn()

const blog = {
  title: 'title here',
  author: 'John Smith',
  likes: 2,
  url: 'www.google.com',
  id: '123123'
}

describe('<Blog />', () => {
  beforeEach(() => {
    render(<Blog key={blog.id} blog={blog} blogService={mockUpdateBlog} deleteService={mockDeleteBlog} />)
  })

  test('blog title and author is visible', () => {
    screen.getByText(`${blog.title}`)
    screen.getByText(`By ${blog.author}`)
  })

  test('URL and likes are shown when show button is clicked', async () => {
    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)
    screen.getByText(`likes ${blog.likes}`)
    screen.getByText(`${blog.url}`)
  })

  test('clicking like triggers event handler', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})



