import percySnapshot from '@percy/playwright';
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

// const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `https://www.staysure.co.uk`;

test.describe('Golden Test', function () {
  test.beforeAll(async function () {

  });

  test.afterAll(() => {
  });

  test.beforeEach(async function ({ page }) {
    // const browser = await chromium.launch();
    // const context = await browser.newContext({ incognito: true })
    // page = await context.newPage()

    await page.goto(TEST_URL, { waitUntil: 'networkidle' });
  });

  test.afterEach(async function ({ page }) {
    // await context.close();
    // await browser.close();
  });

  test('Percy Test Demo', async ({ page }) => {
    await expect(page).toHaveTitle(`Staysure™ Travel Insurance - It's Worth Doing Right`);

    await page.click('#onetrust-accept-btn-handler');
    await percySnapshot(page, 'Landing Page Staysure');
  });

});

