const { beforeEach, describe, expect, test } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('login form is visible', async ({ page }) => {
    const userInput = page.getByLabel('username')
    const passwordInput = page.getByLabel('password')
    const loginButton = page.getByRole('button', { name: 'Log in' })

    expect(userInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(loginButton).toBeVisible()
  })
})