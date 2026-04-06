import { test, expect } from '@playwright/test';

test.describe('Dashboard - Workspace Creation', () => {
  test('debe crear un nuevo workspace a través del chat con IA', async ({ page }) => {
    // 1. Arrange: Vamos directo al creador (ya estamos logueados por el setup)
    await page.goto('/dashboard/workspaces/new');

    // 2. Act: Subimos un archivo PDF y enviamos un mensaje
    // Playwright puede manejar inputs ocultos si apuntamos bien
    const fileChooserPromise = page.waitForEvent('filechooser');
    // Si tu botón de adjuntar dispara el input, lo usamos:
    await page.getByTestId('workspace-attach-file').click();
    const fileChooser = await fileChooserPromise;
    
    // Creamos un PDF de mentira en memoria para el test
    await fileChooser.setFiles({
      name: 'historia-revolucion.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('Contenido ficticio del PDF de historia'),
    });

    const input = page.getByTestId('workspace-chat-input');
    await input.fill('Crea un workspace basado en este PDF sobre la Revolucion Francesa');
    await page.getByTestId('workspace-chat-send').click();

    // 3. Esperar que la IA procese y habilite el botón de confirmación
    const confirmButton = page.getByTestId('workspace-confirm-create');
    
    // Aquí es donde el timeout es clave (la IA analiza el PDF)
    await expect(confirmButton).toBeVisible({ timeout: 20000 });
    
    await confirmButton.click();

    // 4. Assert: Redirección exitosa
    await expect(page).toHaveURL(/\/dashboard\/workspaces\/[a-zA-Z0-9_-]+/);
    
    // Verificar que el título del workspace en el header sea el correcto (o contenga algo del tema)
    // Nota: El header suele tener el nombre del workspace
    await expect(page.locator('h1')).toContainText(/Revolucion Francesa/i);
  });
});
