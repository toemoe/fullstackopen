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

  test.describe('When logged in', () => {
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('textbox', { name: /username/i }).fill('second people')
      await page.getByRole('textbox', { name: /password/i }).fill('0123')
      await page.getByRole('button', { name: /login/i }).click()
  
      await page.getByRole('button', { name: /create new blog/i }).click()
  
      await page.getByRole('textbox', { name: /title/i }).fill('test blog')
      await page.getByRole('textbox', { name: /author/i }).fill('author')
      await page.getByRole('textbox', { name: /url/i }).fill('testurl')
  
      await page.getByRole('button', { name: /create/i }).click()
  
      await expect(page.getByText('test blog author')).toBeVisible()
    })

    test('a new blog can be deleted', async ({ page }) => {
      await page.getByRole('textbox', { name: /username/i }).fill('second people')
      await page.getByRole('textbox', { name: /password/i }).fill('0123')
      await page.getByRole('button', { name: /login/i }).click()
      await page.getByRole('button', { name: /View/i }).nth(1).click()

      await page.getByRole('button', { name: /delete/i }).click()
      await expect(page.getByText('test blog author')).not.toBeVisible()
    })
    
  })

  test.describe('User can like blog', () => {
    test('User can like blog', async ({ page }) => {
      await page.getByRole('textbox', { name: /username/i }).fill('second people')
      await page.getByRole('textbox', { name: /password/i }).fill('0123')
      await page.getByRole('button', { name: /login/i }).click()
      await page.getByRole('button', { name: /View/i }).click()

      const likesText = await page.getByText(/likes:/i).textContent()
      const prevLikes = Number(likesText?.match(/\d+/)?.[0])
      await page.getByRole('button', { name: /like/i }).click()
      await expect(page.getByText(`likes: ${prevLikes + 1}`)).toBeVisible()
    })
  })

  test.describe('Sort Blogs', () => {
    test('User should be able to sort blogs', async ({ page }) => {
      await page.getByRole('textbox', { name: /username/i }).fill('second people')
      await page.getByRole('textbox', { name: /password/i }).fill('0123')
      await page.getByRole('button', { name: /login/i }).click()

      // Check first like
      await page.getByRole('button', { name: /View/i }).nth(0).click()
      await page.getByText('likes: 9')
      await page.getByRole('button', { name: /Hide/i }).click()
      // Check second like
      await page.getByRole('button', { name: /View/i }).nth(1).click()
      await page.getByText('likes: 8')
    })
  })
})