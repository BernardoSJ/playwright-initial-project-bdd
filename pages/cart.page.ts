import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async goToCart() {
    await Promise.all([  
      this.cartButton.click(),
      this.page.waitForURL(/cart\.html$/),
    ]);
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
    await expect(this.page).toHaveURL(/cart\.html$/);
  }

  async assertNumberOfProducts(n: number) {
    if (n === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(n));
    }
  }

  async removeProductByName(name: string) {
    const row = this.page.locator('.cart_item').filter({ hasText: name });
    await expect(row).toBeVisible();
    await row.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping() {
    await Promise.all([
      this.page.waitForURL(/inventory\.html$/),
      this.page.locator('[data-test="continue-shopping"]').click(),
    ]);
  }

  async proceedToCheckout() {
    await Promise.all([
      this.page.locator('[data-test="checkout"]').click(),
      this.page.waitForURL(/checkout-step-one\.html$/),
    ]);
  }

  get productNames() { return this.page.locator('.inventory_item_name'); }

  async getProductsNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

}
