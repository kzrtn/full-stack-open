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
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'Password@123')
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await expect(page.getByText('John Smith is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'Password')
      await expect(page.getByText('Invalid credentials')).toBeVisible()
    })

    describe('When logged in', () => {
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'test', 'testAuthor', 'google.com')
        await expect(page.getByText('test')).toBeVisible
        await expect(page.getByText('By testAuthor')).toBeVisible()
      })

      describe('with one post', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'test', 'testAuthor', 'google.com')
          await page.goto('/')
        })

        test('post can be liked', async ({ page }) => {
          const element = page.getByText('by testAuthor')
          await element.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('blogs are sorted according to likes', async ({ page, request }) => {
          await createBlog(page, 'secondBlog', 'secondAuthor', 'google2.com')
          // Like the first post twice
          const element = page.getByText('by testAuthor')
          await element.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await page.goto('/')

          // Then locate multiple divs
          await expect(page.getByTestId('blog').nth(0)).toContainText('test By testAuthor')
          await expect(page.getByTestId('blog').nth(1)).toContainText('secondBlog By secondAuthor')
        })

        test('post can be deleted', async ({ page }) => {
          page.on('dialog', dialog => dialog.accept())
          const element = page.getByText('by testAuthor')
          await element.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'remove' }).click()
          await page.getByText('Deleted').waitFor()
          await expect(page.getByText('by testAuthor')).not.toBeVisible()
        })

        describe('with two users', () => {
          beforeEach(async ({ page, request }) => {
            await request.post('/api/users',
              {
                data: {
                  name: 'Jane Doe',
                  username: 'root2',
                  password: 'Password@123'
                }
              }
            )
            await page.goto('/')
          })

          test('only the blog post owner can see the delete button', async ({ page }) => {
            await expect(page.getByText('John Smith is logged in')).toBeVisible()
            const element = page.getByText('by testAuthor')
            await element.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
          })

          test('non blog owner cannot see the delete button', async ({ page }) => {
            await page.getByRole('button', { name: 'Log out' }).click()
            await loginWith(page, 'root2', 'Password@123')
            await expect(page.getByText('Jane Doe is logged in')).toBeVisible()
            const element = page.getByText('by testAuthor')
            await element.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
          })
        })
      })
    })
  })

  
})