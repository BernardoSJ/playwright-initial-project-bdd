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
  this.page.setDefaultTimeout(process.env.CI === 'true' ? 15_000 : 5_000);
  this.page.setDefaultNavigationTimeout(process.env.CI === 'true' ? 45_000 : 15_000);
  
  if (process.env.CI === 'true' || process.env.TRACE === '1') {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });
  }
});

After(async function (this: CustomWorld, scenario) {
  const failed = scenario.result?.status !== Status.PASSED;
  const slug = scenario.pickle.name.replace(/[^\w\d-_]+/g, '_').slice(0, 80);

  // --- TRACE ---
  let tracePath: string | null = null;

  const shouldTraceHaveFile = failed || process.env.TRACE === '1' || process.env.CI === 'true';

  if (shouldTraceHaveFile) {
    tracePath = path.join('test-results', 'traces', `${slug}.zip`);
    fs.mkdirSync(path.dirname(tracePath), { recursive: true });
    try {
      await this.context.tracing.stop({ path: tracePath });
    } catch {
      tracePath = null;
    }
  } else {
    try {
      await this.context.tracing.stop();
    } catch {}
  }

  // --- SCREENSHOT ---
  if (failed) {
    const png = await this.page.screenshot({ fullPage: true });
    await this.attach(png, 'image/png');
  }

  // --- VIDEO ---
  const video = this.page.video();

  await this.page.close();
  await this.context.close();
  await this.browser.close();

  let videoPath: string | null = null;

  if (video && failed) {
    const src = await video.path();
    videoPath = path.join('test-results', 'videos', `${slug}.webm`);
    fs.mkdirSync(path.dirname(videoPath), { recursive: true });
    fs.renameSync(src, videoPath);
  }

  // --- ATTACH TRACE + VIDEO TO ALLURE (via Cucumber attach) ---
  if (failed && tracePath && fs.existsSync(tracePath)) {
    const traceBuffer = fs.readFileSync(tracePath);
    await this.attach(traceBuffer, 'application/zip');
  }

  if (failed && videoPath && fs.existsSync(videoPath)) {
    const videoBuffer = fs.readFileSync(videoPath);
    await this.attach(videoBuffer, 'video/webm');
  }
});
