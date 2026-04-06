import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('debe mostrar el título principal y navegar al registro', async ({ page }) => {
    // 1. Arrange: Vamos a la home
    await page.goto('/');

    // 2. Assert: Verificamos el H1 (usamos una expresión regular para ignorar espacios y saltos de línea)
    const title = page.locator('h1');
    await expect(title).toContainText('Convierte tus apuntes en Conocimiento');

    // 3. Act: Hacemos clic en el botón principal
    // Buscamos el link que contiene "Comenzar ahora"
    const ctaButton = page.getByRole('link', { name: /Comenzar ahora/i });
    await ctaButton.click();

    // 4. Assert final: ¿Llegamos al registro?
    await expect(page).toHaveURL(/\/auth\/register/);
  });
});
