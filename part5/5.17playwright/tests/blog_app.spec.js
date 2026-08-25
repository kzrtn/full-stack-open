const { beforeEach, describe, expect, test } = require('@playwright/test')
import { loginWith } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/test/reset')
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
  })
})