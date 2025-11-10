import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage{
    readonly page: Page;
    readonly title: Locator;
    readonly description: Locator;
    readonly price: Locator;
    readonly addOrRemoveBtn: Locator;
    readonly backBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.inventory_details_name');
        this.description = page.locator('.inventory_details_desc');
        this.price = page.locator('.inventory_details_price');
        this.addOrRemoveBtn = page.locator('button:has-text("Add to cart"), button:has-text("Remove")');
        this.backBtn = page.locator('[data-test="back-to-products"]');
    }

    async assertLoaded(expectedName: string) {
        await expect(this.title).toHaveText(expectedName);
    }

    async addToCart() {
        if (await this.addOrRemoveBtn.innerText() === 'Add to cart') {
            await this.addOrRemoveBtn.click();
        }
    }

    async backToCatalog() {
        await this.backBtn.click();
        await expect(this.page).toHaveURL(/inventory\.html$/);
    }
}