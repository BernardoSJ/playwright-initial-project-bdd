import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

export class SidebarPage {
  readonly page: Page;
  readonly burgerButton: Locator;
  readonly logoutButton: Locator;
  readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerButton = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
  }

  async openMenuIfNeeded() {
    if (!(await this.logoutButton.isVisible())) return;
    await this.burgerButton.click();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.closeMenuButton).toBeVisible();
  }

  async logout() {
    await this.openMenuIfNeeded();
    await Promise.all([this.logoutButton.click(), this.page.waitForURL(/\/$/)]);
  }

  async assertLoggedOut() {
    const login = new LoginPage(this.page);
    await expect(login.userTextBox).toBeVisible();
    await expect(this.page).toHaveURL(/\/$/);
  }
}
