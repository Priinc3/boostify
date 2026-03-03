const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const filePath = path.resolve(__dirname, 'brochure-fmcg.html');
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    await page.pdf({
        path: path.resolve(__dirname, 'Boostify-FMCG-Brochure.pdf'),
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    console.log('✅ PDF generated: Boostify-FMCG-Brochure.pdf');
    await browser.close();
})();
