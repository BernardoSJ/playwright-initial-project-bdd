import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';

export type UserRole =
  | 'standard_user'
  | 'problem_user'
  | 'performance_glitch_user'
  | 'locked_out_user';

type Fixtures = {
  userRole: UserRole;
  inventory: InventoryPage;
};

export const test = base.extend<Fixtures>({
  
  userRole: ['standard_user', { option: true }],

 
  inventory: async ({ page, userRole }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(userRole, 'secret_sauce');

    
    if (userRole === 'locked_out_user') {
      throw new Error(
        'You can not used this fixture for negative cases',
      );
    }

    const inventory = new InventoryPage(page);
    await inventory.assertLoaded();
    await use(inventory);
  },
});

export const expect = test.expect;