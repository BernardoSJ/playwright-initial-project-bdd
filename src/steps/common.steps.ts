import { Given } from '@cucumber/cucumber';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';
import { expect } from '@playwright/test';

Given('I am logged in as {string} with {string}', async function (username: string, password: string) {
  await this.page.goto('/');
  const login = new LoginPage(this.page);
  await login.login(username, password);

  const inventory = new InventoryPage(this.page);
  await inventory.assertLoaded();
  await expect(this.page).toHaveURL(/inventory\.html$/);
});
