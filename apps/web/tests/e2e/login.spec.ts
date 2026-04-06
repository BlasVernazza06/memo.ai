import { expect, test } from '@playwright/test';

// Forzamos que este test NO use la sesión guardada del setup
test.use({ storageState: { cookies: [], origins: [] } });

test('user can login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByTestId('email-input').fill('demo@gmail.com');

  await page.getByTestId('password-input').fill('password');

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await expect(page).toHaveURL(/\/dashboard/);
});
