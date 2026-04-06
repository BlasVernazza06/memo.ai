import { expect, test } from '@playwright/test';

// Forzamos que este test NO use la sesión guardada del setup
test.use({ storageState: { cookies: [], origins: [] } });

test('user can sign up with valid credentials', async ({ page }) => {
  await page.goto('/auth/signup');

  const uniqueEmail = `test-${Date.now()}@example.com`;

  await page.getByTestId('name-input').fill('Test User');

  await page.getByTestId('email-input').fill(uniqueEmail);

  await page.getByTestId('password-input').fill('testpassword123');

  await page.getByTestId('confirm-password-input').fill('testpassword123');

  await page.getByRole('button', { name: 'Registrarse' }).click();

  await expect(page).toHaveURL(/\//);
});
