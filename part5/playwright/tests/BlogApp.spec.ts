import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    // обнуляем базу
    await request.post('http://localhost:3001/api/testing/reset')

    // создаём юзера
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'second people',
        name: 'Second Test User',
        password: '0123'
      }
    })

    // заходим на фронт
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Login Application')
    await expect(locator).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('second people')
      await textboxes[1].fill('0123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Welcome, pass0123')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('incorrect')
      await textboxes[1].fill('incorrect')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
})


