import { Injectable } from '@nestjs/common';
import puppeteer, { Puppeteer } from 'puppeteer-core';
import { executablePath } from 'puppeteer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FuelService {
  constructor(private readonly configService: ConfigService) {}

  async getFuelPrice() {
    // const browser = await puppeteer.connect({
     const browserWSEndpoint = this.configService.getOrThrow('BROWSER_WS');

      if (!browserWSEndpoint) {
        throw new Error('Browser WS endpoint is not set');
      } 
      
      const browser = await puppeteer.connect({ browserWSEndpoint});
   // });
    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto('https://www.goodreturns.in/petrol-price.html')
      ]);

        return await page.$$eval('table.gold_silver_table tr:not(:first-child)', (rows) => {
          return rows.map((row) => {
            const title = row.cells[0].textContent.trim();
            const price = row.cells[1].textContent.trim();
            return {title, price};
          });
        });
    } finally{
      await browser.close();
    }
  
  }     
}
