import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('Cadastrar novo usuário no Buggy Cars Rating', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/register');
  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2000);

  // Gera um nome de usuário único
  const timestamp = Date.now();
  const username = `carlos_teste_${timestamp}`;

  await page.locator('#username').fill(username);
  await page.locator('#firstName').fill('Carlos');
  await page.locator('#lastName').fill('Tratorzão');
  await page.locator('#password').fill('SenhaForte123!');
  await page.locator('#confirmPassword').fill('SenhaForte123!');

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Register' }).click();

  await page.waitForTimeout(3000);

  // Valida a mensagem de sucesso
  const mensagem = await page.locator('.result').textContent();
  await expect(mensagem?.trim()).toContain('Registration is successful');

  await page.waitForTimeout(3000);
});