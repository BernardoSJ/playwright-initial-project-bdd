import { test, expect } from '@fixtures/auth.fixture';
import { SidebarPage } from '@pages/sidebar.page';

test.use({ userRole: 'standard_user'});

test.describe("@logout Logout Module", () => {

    test("Simple Logout", async ({inventory}) => {
        const sideBarPage = new SidebarPage(inventory.page);
        await sideBarPage.logout();
        await sideBarPage.assertLoggedOut();
    });

});