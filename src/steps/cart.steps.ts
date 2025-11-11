import { When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { expect } from '@playwright/test';

When('I add {int} products to the cart', async function (n: number) {
  const inventory = new InventoryPage(this.page);
  const names = await inventory.addProducts(n);
  this._addedNames = names;
});

Then('the cart badge should show {int}', async function (n: number) {
  const cart = new CartPage(this.page);
  await cart.assertNumberOfProducts(n);
});

When('I open the cart', async function () {
  const cart = new CartPage(this.page);
  await cart.goToCart();
});

Then('I should see the same {int} product names in the cart', async function (n: number) {
  const cart = new CartPage(this.page);
  const current = await cart.getProductsNames();
  const expected: string[] = this._addedNames || [];
  expect(expected.length).toBe(n);
  expect(current).toEqual(expected);
});

When('I remove the first product from the cart', async function () {
  const names: string[] = this._addedNames || [];
  const first = names[0];
  const cart = new CartPage(this.page);
  await cart.removeProductByName(first);
});

Then('the cart badge should be hidden', async function () {
  const cart = new CartPage(this.page);
  await expect(cart.cartBadge).toBeHidden();
});
