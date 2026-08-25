const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, contents) => {
  await page.getByRole('button', { name: 'new note' }).click()
  await page.getByRole('textbox').fill(contents)
  await page.getByRole('button', { name: 'save'}).click()
  await page.getByText(content).waitFor()
}

export { loginWith, createNote }