// const puppeteer = require('puppeteer');

// async function generatePDF(html) {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         executablePath: process.env.CHROME_PATH || '/usr/bin/chromium-browser'
//     });

//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: 'networkidle0' });

//     const pdfBuffer = await page.pdf({ format: 'A4', landscape: true });

//     await browser.close();
//     return pdfBuffer;
// }

// module.exports = { generatePDF };





// (async () => {
//     const browser = await puppeteer.launch({
//       executablePath: 'C:\\Users\\daridram\\.cache\\puppeteer\\chrome\\win64-127.0.6533.88\\chrome-win64\\chrome.exe',
//     });
//     const page = await browser.newPage();
//     await page.goto('https://example.com');
//     // Your code here
//     await browser.close();
//   })();
  