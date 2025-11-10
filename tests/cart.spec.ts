import { test, expect } from '@fixtures/auth.fixture';
import { CartPage } from '@pages/cart.page';

test.use({ userRole: 'standard_user'});

test.describe('@cart Cart Module', () => {

    test('Add 2 Products and Verify Products Are Added', async ({inventory}) => {
        const cartPage = new CartPage(inventory.page);
        const products = await inventory.addProducts(2);
        
        await cartPage.assertNumberOfProducts(2);
        await cartPage.goToCart();

        const currentNames = await cartPage.getProductsNames();
        expect(currentNames).toEqual(products);
    });

    test('Remove Products From Cart And Validate Cart Badge', async ({inventory}) => {
        const cartPage = new CartPage(inventory.page);
        const products = await inventory.addProducts(1);
        
        await cartPage.assertNumberOfProducts(1);
        await cartPage.goToCart();

        await cartPage.removeProductByName(products[0]);

        await expect(cartPage.cartBadge).toBeHidden();
        await cartPage.continueShopping();
        await expect(cartPage.cartBadge).toBeHidden();
    })

});