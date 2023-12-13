import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('test', async ({ page }) => {
  const currentDate = new Date();
  var start = currentDate.getDate() + 7;
  var end = currentDate.getDate() + 14;
  let trip_start_date = `${start}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  let trip_end_date = `${end}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

  await page.goto('https://uat-travelinsurance.staysure.co.uk/quote/policy-details');
  await page.waitForURL('**/policy-details')
  await percySnapshot(page, 'Web Quote Trip Page Before Accepting Cookies');

  await page.locator('#onetrust-accept-btn-handler').click();
  await page.waitForURL('**/policy-details')
  await percySnapshot(page, 'Web Quote Trip Page After Accepting Cookies');

  await page.locator('//input[@id="fld-cover-singletrip"]/parent::label').click();
  await page.locator('#cruise-no').click();
  await page.locator('#departure-UK1').click();
  await page.locator('#countrySearchInput').click();
  await page.locator('#countrySearchInput').fill('Monaco');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await page.locator('#datepicker-departure-text').fill(trip_start_date);
  await page.locator('#datepicker-return-text').fill(trip_end_date);
  await page.locator('//input[@id="fld-cover-individual"]/parent::label').click();
  await page.locator('#traveler_age_1').fill('30');
  await page.selectOption('#organiserTitle', 'Mr');
  await page.locator('#firstname').fill('Madhawa');
  await page.locator('#lastname').fill('Ratnayake');
  await page.locator('#email').fill('madhawa@intervest.lk');
  await page.locator('#dayTimeTelephone').fill('0771257025');
  await page.locator('#postcode').fill('NN47YB');
  await page.locator('#btnSubmit').click();
  await page.locator('#my-account-continue2').click();
  await page.waitForURL('**/personal-details')
  await percySnapshot(page, 'Web Quote Travellers Page');

  await page.selectOption('#traveler_title_0', 'Mrs');
  await page.locator('#traveler_first_name_0').click();
  await page.locator('#traveler_first_name_0').fill('Jane');
  await page.locator('#traveler_last_name_0').click();
  await page.locator('#traveler_last_name_0').fill('Doe');

  await page.locator('#medical-yes').click();  
  await page.waitForURL('**/medical-aggregator/**')
  await percySnapshot(page, 'Medical Screening');
  await page.locator('#conditionsearch').fill('Burns');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.locator('body')).toContainText('Burns');
  await page.locator('//button[@name="foundConditionid" and @title="Burns"]/child::span').click();
  await expect(page.locator('body')).toContainText('Are any further dressings required for your burns?');
  await page.locator('//input[@name="answerNum" and @value="1"]').click();
  await expect(page.locator('body')).toContainText('Is any surgery required in the future to treat the burns?');
  await page.locator('//input[@name="answerNum" and @value="2"]').click();
  await expect(page.locator('body')).toContainText('Have the burns caused other problems such as skin infections?');
  await page.locator('//input[@name="answerNum" and @value="2"]').click();
  await page.locator('//input[@value="Continue"]').click();
  await page.waitForLoadState();
  await expect(page.locator('#FinishText1')).toContainText('Please repeat the search process if you have further medical conditions to declare.');
  await expect(page.locator('#FinishText2')).toContainText('If you have completed your declaration, press the finish button.');
  await page.locator('#btnSubmit').click();
  await page.waitForURL('**/personal-details')

  await page.locator('#checkbox-accept-label').click();
  await page.locator('//input[@value="Continue"]').click();
  await page.getByRole('heading', { name: 'IMPORTANT PLEASE READ' });
  await page.locator('#medical_dec_submit_btn').click();
  await page.waitForLoadState('networkidle')
  await page.waitForURL('**/results')
  await percySnapshot(page, 'Web Quote Quote Page');

  await expect(page.locator('body')).toContainText('We have different levels of cover for you to compare and choose. You can also tailor your quote by adding additional cover for added peace of mind.');
  await page.waitForLoadState('networkidle')
  await page.locator('//button[@id="SINGLE_TRIP_COMPREHENSIVE_select_btn_bottom"]').click();
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('#OETotalPrice');
  await page.locator('#OEWEB_GADGET_COVER label').click();
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('#my-account-save-quote-btn');
  await page.locator('#OEContinueBtn').click();
  await page.waitForURL('**/payment-details')
  await percySnapshot(page, 'Web Quote Review Page');

  await page.selectOption('#day', '27');
  await page.selectOption('#month', '05');
  await page.selectOption('#year', '1989');
  await page.locator('#findAddress').click();
  await page.selectOption('#dropDownList', 'Staysure Services Britannia House Rushmills Northampton');
  await page.locator('#makePayment').click();

  await page.waitForURL('**/TICORP/**');
  await percySnapshot(page, 'Payment Gateway');
  await page.getByPlaceholder('Enter your Name').click();
  await page.getByPlaceholder('Enter your Name').fill('Madhawa Ratnayake');
  await page.getByPlaceholder('Enter your Card Number').click();
  await page.getByPlaceholder('Enter your Card Number').fill('4111 1111 1111 111');
  await page.locator('#expiryMonthTooltipText').click();
  await page.getByLabel('Expiry Month*The month of').selectOption('10');
  await page.getByLabel('Expiry Year*The year of your').selectOption('2030');
  await page.getByLabel('Card Security Code*The Card').click();
  await page.getByLabel('Card Security Code*The Card').fill('737');
  await page.getByRole('button', { name: 'Pay Now' }).click();
  await page.frameLocator('iframe[name="ReferrerStage11702278187031"]').getByLabel('Close').click();
  await percySnapshot(page, 'Web Quote Thank You Page');

  await expect(page.locator('body')).toContainText('You will shortly receive an email containing your policy documents');
  await expect(page.locator('h1')).toContainText('Thank you, your trip is now covered!');
  await expect(page.locator('body')).toContainText('If you don\'t receive these please check your spam or junk folder. You can also access these by signing up for an account.');
  await expect(page.getByRole('button', { name: ' Print policy' })).toBeVisible();
  await expect(page.locator('body')).toContainText('Mr Madhawa Ratnayake');
});