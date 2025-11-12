import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { CheckoutPage } from '@pages/checkout.page';
import { buildCustomer } from '@utils/dataBuilder';

When('I add {int} product to the cart', async function (n: number) {
  const inventory = new InventoryPage(this.page);
  await inventory.addProductsWithoutList(n);
});

When('I proceed to checkout', async function () {
  const cart = new CartPage(this.page);
  await cart.proceedToCheckout();
});

When('I complete the checkout form with random customer data', async function () {
  const checkout = new CheckoutPage(this.page);
  const c = buildCustomer();      
  await checkout.fillCheckoutDetails(c.firstName, c.lastName, c.zip);
  await checkout.clickFinishButton();
});

Then('the order should be completed successfully', async function () {
  const checkout = new CheckoutPage(this.page);
  await checkout.assertCheckoutComplete();
  await expect(this.page).toHaveURL(/checkout-complete\.html$/);
});

Then('I should stay on checkout step one with a required fields error', async function () {
  const checkout = new CheckoutPage(this.page);
  await checkout.continueButton.click();
  await checkout.assertErrorMessage();
  await expect(this.page).toHaveURL(/checkout-step-one\.html$/);
})
