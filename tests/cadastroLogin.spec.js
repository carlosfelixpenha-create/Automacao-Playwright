import { test, expect } from '@playwright/test';

test('Cadastrar e logar com novo usuário', async ({ page }) => {
  // Gera nome de usuário único
  const timestamp = Date.now();
  const username = `carlos_teste_${timestamp}`;
  const senha = 'SenhaForte123!';

  // Acessa a página de registro
  await page.goto('https://buggy.justtestit.org/register');
  await expect(page).toHaveURL(/.*register/);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000); // só pra visualizar o scroll

  // Preenche o formulário de cadastro
console.log(`[${timestamp}] Preenchendo campo de usuário`);
await page.locator('#username').focus();
await page.locator('#username').fill(username);
await page.waitForTimeout(1000);

console.log(`[${timestamp}] Preenchendo nome`);
await page.locator('#firstName').focus();
await page.locator('#firstName').fill('Carlos');
await page.waitForTimeout(1000);

console.log(`[${timestamp}] Preenchendo sobrenome`);
await page.locator('#lastName').focus();
await page.locator('#lastName').fill('Tratorzão');
await page.waitForTimeout(1000);

console.log(`[${timestamp}] Preenchendo senha`);
await page.locator('#password').focus();
await page.locator('#password').fill(senha);
await page.waitForTimeout(1000);

console.log(`[${timestamp}] Confirmando senha`);
await page.locator('#confirmPassword').focus();
await page.locator('#confirmPassword').fill(senha);
await page.waitForTimeout(1000);
  
// Envia o formulário
  await page.getByRole('button', { name: 'Register' }).click();

  // Valida mensagem de sucesso
  const mensagem = page.locator('.result');
  await expect(mensagem).toHaveText(/Registration is successful/);

  // Login via header
  const header = page.locator('nav');
  console.log(`[${timestamp}] Confirmando usuário`);
  await header.locator('input[name="login"]').fill(username);
  await page.waitForTimeout(2000);
  console.log(`[${timestamp}] Confirmando senha`);
  await header.locator('input[name="password"]').fill(senha);
  await page.waitForTimeout(2000);
  await header.getByRole('button', { name: 'Login' }).click();

  // Valida saudação após login
  const saudacao = page.locator('.nav-link').first();
  await expect(saudacao).toContainText('Hi, Carlos');
});