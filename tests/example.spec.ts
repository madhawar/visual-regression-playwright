import { test, expect } from '@playwright/test';

test('Visual Comparison Test Demo', async ({ page }) => {
  await page.goto('https://www.staysure.co.uk');
  await page.click('#onetrust-accept-btn-handler');
  await expect(page).toHaveTitle(`Staysure™ Travel Insurance - It's Worth Doing Right`);
  expect(await page.screenshot({fullPage: true})).toMatchSnapshot();
});

// test('has title', async ({ page }) => {
//   await page.goto('https://www.staysure.co.uk');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(`Staysure™ Travel Insurance - It's Worth Doing Right`);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://www.staysure.co.uk');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get a quote' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
