import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';

test.describe('@login Login Module', () => {
  
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });
 
  test('Working With Standard Credentials', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await login.login('standard_user', 'secret_sauce');
    await inventory.assertLoaded();
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  test('Not Working With Locked User', async ({ page }) => {
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.errorMessage).toContainText('Sorry, this user has been locked out');
    await expect(login.userTextBox).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });

});
