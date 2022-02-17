import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> submits with the correct details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'test' }
  })
  fireEvent.change(author, {
    target: { value: 'tester' }
  })
  fireEvent.change(url, {
    target: { value: 'test.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})