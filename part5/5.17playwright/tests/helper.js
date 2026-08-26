const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).waitFor()
  await page.getByRole('button', { name: 'Log in' }).click({force: true})
}

const createBlog = async (page, title, author, url) => {
  await page.getByText('is logged in').waitFor()
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url:').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`By ${author}`).waitFor()
}

export { loginWith, createBlog }