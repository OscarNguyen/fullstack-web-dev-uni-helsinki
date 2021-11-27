import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog.js'

test.only('the form calls the event handler it received as props with the right details when a new blog is created.', () => {
  const addBlog = jest.fn()
  // const appComponent = render(<App />)

  const component = render(<CreateBlog onAddBlog={addBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  // const form = component.container.querySelector('form')
  // const openBlog = component.container.querySelector('.openBlogForm')

  // fireEvent.click(openBlog)

  const submitBtn = component.container.querySelector('.submitBtn')

  fireEvent.change(title, {
    target: { value: 'HP', name: 'title' }
  })
  fireEvent.change(author, {
    target: { value: 'JK', name: 'author' }
  })
  fireEvent.change(url, {
    target: { value: 'hp.com', name: 'url' }
  })

  fireEvent.click(submitBtn)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('HP')
  expect(addBlog.mock.calls[0][0].author).toBe('JK')
  expect(addBlog.mock.calls[0][0].url).toBe('hp.com')

})