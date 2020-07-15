const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://business.facebook.com/creatorstudio');

  await page.click('button._271k._1qjd');
  await page.waitForNavigation();

  await page.type('#email', 'juniortimber69@gmail.com');
  await page.type('#pass', 'bpgc://2001');  
  await page.click('#loginbutton');  
  await page.waitForNavigation();


  await page.goto('https://business.facebook.com/creatorstudio/?tab=instagram_content_posts&mode=instagram&collection_id=all_pages&content_table=INSTAGRAM_POSTS');

//   page.click('#media_manager_chrome_bar_instagram_icon');  
  await page.waitForNavigation().catch((err) => { console.error(err); });
//   await page.click('#media_manager_chrome_bar_instagram_icon').then(() => page.waitForNavigation({waitUntil: 'load'}));
  page.click('#js_1yo');  
  await page.waitForNavigation();
  page.click('li._8l9y._5f0v');  
  await page.waitForNavigation();


  await page.type('div._7-2a._5yk1', 'test post no. 1');

  await page.screenshot({path: 'example.png'});
  await browser.close();
})();