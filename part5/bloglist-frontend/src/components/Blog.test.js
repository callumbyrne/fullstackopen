import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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

test('by default blog renders title and author, but not url and likes', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent('one')
  expect(component.container).toHaveTextContent('two')

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})