import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Percy Test Demo', async ({ page }) => {
  await page.goto('https://www.staysure.co.uk', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(`Staysure™ Travel Insurance - It's Worth Doing Right`);
  
  await page.click('#onetrust-accept-btn-handler');  
  await percySnapshot(page, 'Landing Page');
});