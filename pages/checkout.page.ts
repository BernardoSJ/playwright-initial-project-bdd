import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly zipCodeTextBox: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeaderLabel: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstNameTextBox = page.locator('#first-name');
        this.lastNameTextBox = page.locator('#last-name');
        this.zipCodeTextBox = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeHeaderLabel = page.locator('[data-test="complete-header"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillCheckoutDetails(firstName: string, lastName: string, zipCode: string){
        await this.firstNameTextBox.fill(firstName);
        await this.lastNameTextBox.fill(lastName);
        await this.zipCodeTextBox.fill(zipCode);
        await Promise.all([
            this.page.waitForURL(/checkout-step-two\.html$/),
            this.continueButton.click(),
        ]);
        await expect(this.finishButton).toBeVisible();
    }

    async clickFinishButton(){
        await Promise.all([
            this.page.waitForURL(/checkout-complete\.html$/),
            this.finishButton.click(),
        ]);
    }

    async assertCheckoutComplete(){
        await expect(this.completeHeaderLabel).toHaveText("Thank you for your order!");
    }

    async assertErrorMessage(){
        await expect(this.errorMessage).toContainText("Error: First Name is required");
    }

}