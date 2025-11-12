import { Given, When } from '@cucumber/cucumber';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';
import { expect } from '@playwright/test';
import { CartPage } from '@pages/cart.page';

Given('I am logged in as {string} with {string}', async function (username: string, password: string) {
  await this.page.goto('/');
  const login = new LoginPage(this.page);
  await login.login(username, password);

  const inventory = new InventoryPage(this.page);
  await inventory.assertLoaded();
  await expect(this.page).toHaveURL(/inventory\.html$/);
});

When('I open the cart', async function () {
  const cart = new CartPage(this.page);
  await cart.goToCart();
});
