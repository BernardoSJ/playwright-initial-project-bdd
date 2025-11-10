import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userTextBox: Locator;
  readonly passTextBox: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userTextBox = page.getByRole('textbox', { name: 'Username' });
    this.passTextBox = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login'});
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.userTextBox).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.userTextBox.fill(username);
    await this.passTextBox.fill(password);
    await this.loginButton.click();
  }
}
