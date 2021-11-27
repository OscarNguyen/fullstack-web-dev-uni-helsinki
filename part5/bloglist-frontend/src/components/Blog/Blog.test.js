import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogService from '../../services/blogs'
// import App from '../../App'

const blog = {

  title: 'cc',
  author: 'cdm',
  url: 'cc.com',
  likes: 100


}
let component
let mockHandler

beforeEach(() => {
  mockHandler = jest.fn()

  component = render(<Blog blog={blog} onUpdateBlog={mockHandler} />)
})

test('render Blog content', () => {
  const div = component.container.querySelector('.summary')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
})

test('click View btn to show number of likes and blog url', () => {
  const viewBtn = component.container.querySelector('.btn')
  fireEvent.click(viewBtn)

  const div = component.container.querySelector('.details')
  expect(div).toHaveStyle('display: block')
  expect(div).toHaveTextContent(`${blog.url}${blog.likes}`)
})

test(' if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
  const updateMock = jest.spyOn(BlogService, 'updateBlog')

  const viewBtn = component.container.querySelector('.btn')
  fireEvent.click(viewBtn)
  const likeBtn = component.container.querySelector('.likeBtn')
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)


  expect(updateMock.mock.calls).toHaveLength(2)
})






