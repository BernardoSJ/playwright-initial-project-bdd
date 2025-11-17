import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly titleText: Locator;
  readonly sortSelect: Locator;
  readonly addToCartButtons: Locator;
  readonly productDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleText = page.locator('.title');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.productDetails = page.locator('.inventory_item_name');
  }

  async assertLoaded() {
    await expect(this.titleText).toHaveText('Products');
  }

  async assertProductDetailAndBackHome(n: number) {
    const inventoryUrl = '/inventory.html';
    for (let i = 0; i < n; i++) {
      await this.productDetails.nth(i).click();
      await expect(this.page).not.toHaveURL(/inventory\.html$/);
      await this.page.goBack();
      await expect(this.page).toHaveURL(new RegExp(`${inventoryUrl}$`));
    }
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    const valueMap = { az: 'az', za: 'za', lohi: 'lohi', hilo: 'hilo' };
    await this.sortSelect.selectOption(valueMap[option]);
  }

  async addProducts(n: number): Promise<string[]> {
    const productsName: string[] = [];

    const items = this.page.locator('.inventory_item');
    const count = Math.min(n, await items.count());

    for (let i = 0; i < count; i++) {
      const currentItem = items.nth(i);
      const currentName = await currentItem.locator('.inventory_item_name').innerText();

      await currentItem.locator('[data-test^="add-to-cart"]').click();
      productsName.push(currentName);
    }
    return productsName;
  }

  async addProductsWithoutList(n: number) {
    const items = this.page.locator('.inventory_item');
    const count = Math.min(n, await items.count());

    for (let i = 0; i < count; i++) {
      const currentItem = items.nth(i);
      await currentItem.locator('[data-test^="add-to-cart"]').click();
    }
  }

  get productNames() {
    return this.productDetails;
  }
  get productPrices() {
    return this.page.locator('.inventory_item_price');
  }

  async getNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getPrices(): Promise<number[]> {
    const raw = await this.productPrices.allTextContents(); // ["$29.99", "$9.99", ...]
    return raw.map((t) => Number(t.replace('$', '')));
  }
}
