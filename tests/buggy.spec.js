import { test, expect } from '@playwright/test';

test('Validar título principal da página', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org');
  await page.waitForLoadState('networkidle'); // espera a página carregar

  const tituloPrincipal = page.locator('h1.display-4');
  await expect(tituloPrincipal).toContainText('Buggy');
  await expect(tituloPrincipal).toContainText('Cars');
  await expect(tituloPrincipal).toContainText('Rating');

  await page.waitForTimeout(5000); // tempo pra visualizar
});