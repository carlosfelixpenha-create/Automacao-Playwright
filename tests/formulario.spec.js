import { test, expect } from '@playwright/test';

test('Preencher nome, sobrenome, gênero e enviar', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  // Remove banners que atrapalham
  await page.evaluate(() => {
    document.querySelector('#fixedban')?.remove();
    document.querySelector('footer')?.remove();
  });

// Preenchendo os campos
await page.fill('#firstName', 'Carlos');
await page.waitForTimeout(1000);
await page.fill('#lastName', 'Tratorzão');
await page.waitForTimeout(1000);
await page.fill('#userEmail', 'carlos@email.com');
await page.waitForTimeout(1000);
await page.locator('label[for="gender-radio-1"]').click();
await page.waitForTimeout(1000);
await page.fill('#userNumber', '4199999999');
await page.waitForTimeout(1000);

// Data de nascimento
await page.click('#dateOfBirthInput');
await page.selectOption('.react-datepicker__month-select', '0'); // Janeiro
await page.selectOption('.react-datepicker__year-select', '1990');
await page.click('.react-datepicker__day--015'); // Dia 15
await page.waitForTimeout(2000);

// Campo Assuntos
await page.fill('#subjectsInput', 'A');
await page.locator('.subjects-auto-complete__option >> text=Accounting').click();
await page.waitForTimeout(1000);

// Hobbies
await page.locator('label[for="hobbies-checkbox-1"]').click(); // Sports
await page.waitForTimeout(1000);
await page.locator('label[for="hobbies-checkbox-2"]').click(); // Reading
await page.waitForTimeout(1000);

// Selecionando uma foto
await page.setInputFiles('#uploadPicture', 'D:/Desktop/Novo Trabalho/Play.jpg');
await page.waitForTimeout(2000);

// Endereço
await page.fill('#currentAddress', 'Rua dos Testes, 123 - Bairro Central, Bloco B, Apto 202');
await page.waitForTimeout(1000);
// Estado
await page.click('#state');
await page.getByText('NCR', { exact: true }).click();
await page.waitForTimeout(1000);
// Cidade
await page.click('#city');
await page.getByText('Delhi', { exact: true }).click();
await page.waitForTimeout(1000);

// Agora sim: enviar
await page.click('#submit');
await page.waitForTimeout(1000);

// Valida se o modal aparece
const modal = page.locator('.modal-content');
await expect(modal).toBeVisible();
await expect(modal).toContainText('Carlos Tratorzão');

// Fecha o modal
await page.click('#closeLargeModal');
await page.waitForTimeout(1000);

// Valida que o formulário foi limpo
await expect(page.locator('#firstName')).toHaveValue('');
await expect(page.locator('#lastName')).toHaveValue('');
await expect(page.locator('#userEmail')).toHaveValue('');
await expect(page.locator('#userNumber')).toHaveValue('');
await expect(page.locator('#currentAddress')).toHaveValue('');

});