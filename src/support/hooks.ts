import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from './world';
import fs from 'node:fs';
import path from 'node:path';

const pick = (name?: string) =>
  name === 'firefox' ? firefox : name === 'webkit' ? webkit : chromium;

Before(async function (this: CustomWorld) {
  const pw = pick(this.browserName);
  this.browser = await pw.launch({ headless: true });
  this.context = await this.browser.newContext({
    baseURL: 'https://www.saucedemo.com',
    recordVideo: { dir: 'test-results/videos' },
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(5_000);
  this.page.setDefaultNavigationTimeout(15_000);
  if (process.env.TRACE === '1') {
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  }
});

After(async function (this: CustomWorld, scenario) {
  const failed = scenario.result?.status === Status.FAILED;
  const slug = scenario.pickle.name.replace(/[^\w\d-_]+/g, '_').slice(0, 80);

  if (failed || process.env.TRACE === '1') {
    const out = path.join('test-results', 'traces', `${slug}.zip`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    try {
      await this.context.tracing.stop({ path: out });
    } catch {}
  } else {
    try {
      await this.context.tracing.stop();
    } catch {}
  }

  const video = this.page.video();
  await this.page.close();
  await this.context.close();
  await this.browser.close();

  if (video && failed) {
    const src = await video.path();
    const dest = path.join('test-results', 'videos', `${slug}.webm`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(src, dest);
  }
});
