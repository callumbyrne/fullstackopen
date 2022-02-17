import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'one',
  author: 'two',
  url: 'three',
  likes: 4,
  user: {
    username: 'cbyrne',
    name: 'callum',
    id: '61ef9872b6cdf74fdbe99f49'
  },
  id: '61fa0cd937e76e27b02781c0'
}

const user = {
  name: 'callum',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNieXJuZSIsImlkIjoiNjFlZjk4NzJiNmNkZjc0ZmRiZTk5ZjQ5IiwiaWF0IjoxNjQzOTQ4MDYwfQ.kYEysRukF6mn8id6VyB__-cYCfS5f7tca6ujCyvYYhs',
  username: 'cbyrne'
}

const updateBlog = jest.fn()

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} createUpdate={updateBlog} />
    )
  })

  test('by default blog renders title and author, but not url and likes', () => {
    expect(component.container).toHaveTextContent('one')
    expect(component.container).toHaveTextContent('two')

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('url and likes are shown when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('when like button is clicked twice, even handler the component recieves is called twice', () => {
    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})


