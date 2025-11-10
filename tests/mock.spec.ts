import { test, expect } from '@playwright/test';

test.describe('@mock Network (API) Mock Example', () => {

    test('Simulate API Reaponse With Controlled JSON', async ({ page }) => {

        const users = [
            {
                id: 1,
                name: 'Bernardo',
                role: 'Tester'
            },
            {
                id: 1,
                name: 'Maz',
                role: 'Boss'
            },
        ];

        await page.route('**/api/users', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(users),
            });
        });

        
        await page.goto('https://example.com');

        await page.evaluate(() => {
            async function getData() {
                const res = await fetch('/api/users'); // ← relativo al origen actual
                const data = await res.json();
                const pre = document.createElement('pre');
                pre.id = 'result';
                pre.textContent = JSON.stringify(data);
                document.body.appendChild(pre);
            }
            getData();
        });

        await page.waitForSelector('#result', { state: 'attached' });
        const text = await page.locator('#result').textContent();
        const usersResult = JSON.parse(text || '[]');

        expect(usersResult).toEqual(users);
    });

});