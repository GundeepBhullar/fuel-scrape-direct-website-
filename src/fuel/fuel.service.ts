import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

@Injectable()
export class FuelService {
   async getProducts(states: string): Promise<string> { 
    console.log('Launching browser...') 
    const browser = await puppeteer.launch({
      executablePath: executablePath(),
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--ssl-version-max=tls1.3',
        '--ssl-version-min=tls1.2',
        '--enable-features=NetworkService',
        '--enable-features=NetworkServiceInProcess',
      ],
     });


     try{
       console.log('Opening new page...');
       const page = await browser.newPage();
       page.setDefaultNavigationTimeout(2 * 60 * 1000);
      // await Promise.all([
        // page.waitForNavigation(),
       console.log('Navigating to URL..'); 
       await page.goto('https://www.goodreturns.in/petrol-price.html', {
        waitUntil: 'networkidle2',
       });
       //])
       console.log('Typing state: ${state}');
       await page.type('.select2-search__field', states )
       // now i want to press enter button 
       await page.keyboard.press('Enter')

       console.log('Waiting for selector...')
       await page.waitForSelector('#moneyweb-container #moneyweb-leftPanel.gold_silver_intro_desc b');
       // now i want to get the petrol price written in bold
       
       console.log('Extracting price...');
       const price = await page.evaluate(() => {
     
      const petrolPrice= document.querySelector('#moneyweb-container #moneyweb-leftPanel .gold_silver_intro_desc b') as HTMLElement;
      return petrolPrice ? petrolPrice.innerText : 'Price not found';
              });

        console.log(`Extracted price: ${price}`);      
        return price;
         } catch (error) {
          console.error('Error during naviagtion or scraping', error);
          throw error;
         }finally {
          console.log('Closing browser...');
      await browser.close();
     }  
   } 
}
