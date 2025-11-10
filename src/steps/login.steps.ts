import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.page.goto('https://www.saucedemo.com/');
  await expect(this.page.getByPlaceholder('Username')).toBeVisible();
});

When('I log in with credentials {string} and {string}', async function (this: CustomWorld, user: string, pass: string) {
  const login = new LoginPage(this.page);
  await login.login(user, pass);
});

Then('I should be able to see the inventory', async function (this: CustomWorld) {
  const inventory = new InventoryPage(this.page);
  await inventory.assertLoaded();
  await expect(this.page).toHaveURL(/inventory\.html$/);
});
