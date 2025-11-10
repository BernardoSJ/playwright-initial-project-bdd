import { test, expect } from '@fixtures/auth.fixture';
import { CartPage } from '@pages/cart.page';
import { CheckoutPage } from '@pages/checkout.page';
import { customerDataSet } from '@utils/dataBuilder';

test.describe("@checkout Data-Driven Checkout Module", () => {

    customerDataSet.forEach((customer, i) => {
        test(`Happy Checkout With User Case #${i+1}`, async ({inventory}) => {
            const cartPage = new CartPage(inventory.page);
            const checkoutPage = new CheckoutPage(inventory.page);

            await inventory.addProductsWithoutList(1);
            await cartPage.goToCart();
            await cartPage.proceedToCheckout();

            await checkoutPage.fillCheckoutDetails(customer.firstName, customer.lastName, customer.zip);
            await checkoutPage.clickFinishButton();
            await checkoutPage.assertCheckoutComplete();
        });
    });

    test("Non Happy Path", async ({inventory}) => {
        const cartPage = new CartPage(inventory.page);
        const checkoutPage = new CheckoutPage(inventory.page);

        await cartPage.goToCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.continueButton.click();
        await checkoutPage.assertErrorMessage();
        await expect(inventory.page).toHaveURL(/checkout-step-one\.html$/);
    });

});