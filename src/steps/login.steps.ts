import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';

Given('I am on the login page', async function () {
  await this.page.goto('/');
});

When('I login with valid credentials', async function () {
  const login = new LoginPage(this.page);
  await login.login('standard_user', 'secret_sauce');
});

Then('I should be redirected to the inventory page', async function () {
  const inventory = new InventoryPage(this.page);
  await expect(this.page).toHaveURL(/inventory\.html$/);
  await inventory.assertLoaded();
});
