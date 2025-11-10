import { test, expect } from '@fixtures/auth.fixture';

test.use({ userRole: 'standard_user'});

test.describe('@catalog Catalog Module', () => {

    const sortOptions = ['az','za','lohi','hilo'] as const;

    for(const option of sortOptions){
        test(`Sort Catalog by ${option}`, async ({inventory}) => {
            await inventory.sortBy(option);


            if (option === 'az' || option === 'za') {
                const names = await inventory.getNames();
                const expected = [...names].sort((a,b) => a.localeCompare(b));
                if (option === 'za') expected.reverse();
                expect(names).toEqual(expected);
            } else {
                const prices = await inventory.getPrices();
                const expected = [...prices].sort((a,b) => a - b);
            if (option === 'hilo') expected.reverse();
                expect(prices).toEqual(expected);
            }
            await expect(inventory.page).toHaveURL(/inventory\.html$/)
        });
    }

});