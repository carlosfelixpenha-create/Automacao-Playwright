import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('Cadastrar e logar com novo usuário', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/register');
  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2000);

  // Gera nome de usuário único
  const timestamp = Date.now();
  const username = `carlos_teste_${timestamp}`;
  const senha = 'SenhaForte123!';

  // Preenche cadastro
  await page.locator('#username').fill(username);
  await page.locator('#firstName').fill('Carlos');
  await page.locator('#lastName').fill('Tratorzão');
  await page.locator('#password').fill(senha);
  await page.locator('#confirmPassword').fill(senha);

  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Register' }).click();

  await page.waitForTimeout(2000);

  // Valida mensagem de sucesso
  const mensagem = await page.locator('.result').textContent();
  await expect(mensagem?.trim()).toContain('Registration is successful');

  await page.waitForTimeout(2000);

  // Preenche login no topo da tela com escopo do header
  const header = page.locator('nav'); // escopo do topo
  await header.locator('input[name="login"]').fill(username);
  await header.locator('input[name="password"]').fill(senha);
  await header.getByRole('button', { name: 'Login' }).click();

  await page.waitForTimeout(3000);

  // Valida se login foi bem-sucedido
  const saudacao = await page.locator('.nav-link').first().textContent();
  await expect(saudacao).toContain('Hi, Carlos');
});