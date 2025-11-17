import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

type CustomWorld = {
  page: import('playwright').Page;
};

Given('I mock the api users endpoint with fake users', async function (this: CustomWorld) {
  await this.page.route('**/api/users', async (route) => {
    const fakeResponse = {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ],
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeResponse),
    });
  });
});

When('I load a demo page that calls api users', async function (this: CustomWorld) {
  await this.page.goto('https://example.com');

  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Mocked Users</h1>
        <ul id="users"></ul>
        <script>
          (async () => {
            const res = await fetch('/api/users');
            const data = await res.json();
            const ul = document.getElementById('users');

            data.users.forEach(u => {
              const li = document.createElement('li');
              li.textContent = u.name + ' (' + u.email + ')';
              ul.appendChild(li);
            });

            // Para que Playwright pueda leer el JSON final
            const pre = document.createElement('pre');
            pre.id = 'result';
            pre.textContent = JSON.stringify(data);
            document.body.appendChild(pre);
          })();
        </script>
      </body>
    </html>
  `;

  await this.page.setContent(html);
});

Then('I should see the mocked users rendered in the page', async function (this: CustomWorld) {
  const pre = await this.page.waitForSelector('#result');
  const raw = await pre.textContent();
  const data = JSON.parse(raw || '{"users": []}');

  expect(Array.isArray(data.users)).toBe(true);
  expect(data.users).toHaveLength(2);
  expect(data.users[0].name).toBe('John Doe');
  expect(data.users[1].email).toBe('jane@example.com');

  const items = await this.page.locator('#users li').allTextContents();
  expect(items).toContain('John Doe (john@example.com)');
  expect(items).toContain('Jane Doe (jane@example.com)');
});
