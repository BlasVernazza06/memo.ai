import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. Ir al login
  await page.goto('/auth/login');

  // 2. Llenar credenciales (Usa una cuenta de test válida en tu DB)
  await page.getByTestId('email-input').fill('demo@gmail.com');
  await page.getByTestId('password-input').fill('password');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // 3. Esperar a estar en el dashboard (confirmación de éxito)
  await expect(page).toHaveURL(/\/dashboard/);

  // 4. Guardar las cookies y el localStorage
  await page.context().storageState({ path: authFile });
});
