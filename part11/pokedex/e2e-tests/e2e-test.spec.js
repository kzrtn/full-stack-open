const { test, describe, expect, beforeEach } = require('@playwright/test')

const baseUrl = 'http://localhost:8080'

beforeEach(async ({ page }) => {
  await page.goto(baseUrl)
})

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('pokemon details are shown correctly', async ({ page }) => {
    await page.getByText('ivysaur').click()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})