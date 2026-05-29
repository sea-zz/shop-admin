// @ts-check
import { test, expect, chromium } from '@playwright/test';

//TODO:
test.describe('DASHBOARD', () => {
    test.beforeEach(async ({page}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    await context.addCookies([{
        name: 'token',
        value: '7278393ea577003fc002d2f591a3b4e8dfff82de',
        domain: 'http://localhost:5173',
        path: '/#/',
    }]);
    
    await page.route('http://localhost:5173/api/admin/login', async route => {
        await route.fulfill({json: {
    "msg": "ok",
    "data": {
        "token": "7278393ea577003fc002d2f591a3b4e8dfff82de"
    },
    "path": "观看完整课程地址：https:\/\/study.163.com\/course\/courseMain.htm?courseId=1212775807&share=2&shareId=480000001892585"
} });
    });

});

    test('[SPTC0002] dashboard', async ({ page }) => {
        await page.goto('http://localhost:5173/#/');
        const tt = await page.locator('.p-header-title').innerText();
        console.log(1111, tt);
        await expect(tt).toBe('拼多少商城');
        // Expect a title "to contain" a substring.
    });
})
