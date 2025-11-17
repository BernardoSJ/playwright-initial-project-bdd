import { When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '@pages/inventory.page';
import { expect } from '@playwright/test';

When('I sort the catalog by {string}', async function (option: 'az' | 'za' | 'lohi' | 'hilo') {
  const inventory = new InventoryPage(this.page);
  await inventory.sortBy(option);
});

Then(
  'the catalog should be sorted by {string}',
  async function (option: 'az' | 'za' | 'lohi' | 'hilo') {
    const inventory = new InventoryPage(this.page);

    if (option === 'az' || option === 'za') {
      const names = await inventory.getNames();
      const expected = [...names].sort((a, b) => a.localeCompare(b));
      if (option === 'za') expected.reverse();
      expect(names).toEqual(expected);
    } else {
      const prices = await inventory.getPrices();
      const expected = [...prices].sort((a, b) => a - b);
      if (option === 'hilo') expected.reverse();
      expect(prices).toEqual(expected);
    }
  },
);
