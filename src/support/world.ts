import { setWorldConstructor, IWorldOptions, World, setDefaultTimeout } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  browserName: 'chromium' | 'firefox' | 'webkit';
  constructor(opts: IWorldOptions) {
    super(opts);
    this.browserName = (process.env.BROWSER as any) || 'chromium';
  }
}
setWorldConstructor(CustomWorld);
setDefaultTimeout(60_000);
