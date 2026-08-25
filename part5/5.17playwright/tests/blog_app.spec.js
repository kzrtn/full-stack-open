const { beforeEach, describe, expect, test } = require('@playwright/test')
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/test/reset-users')
    await request.post('/api/test/reset-blogs')
    await request.post('/api/users',
      {
        data: {
          name: 'John Smith',
          username: 'root',
          password: 'Password@123'
        }
      }
    )
    await page.goto('/')
  })

  test('login form is visible', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'Password@123')
      await expect(page.getByText('John Smith is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'Password')
      await expect(page.getByText('Invalid credentials')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'root', 'Password@123')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'test', 'testAuthor', 'google.com')
        await expect(page.getByText('test')).toBeVisible
        await expect(page.getByText('By testAuthor')).toBeVisible()
      })

      describe('with one post', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'test', 'testAuthor', 'google.com')
        })

        test.only('post can be liked', async ({ page }) => {
          const element = page.getByText('by testAuthor')
          await element.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await expect(page.getByText('likes 1')).toBeVisible()
        })
      })
    })
  })

  
})