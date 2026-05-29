// @ts-check
import { test, expect } from '@playwright/test';

test.describe('HOME_LOGIN_DD', () => {
    test('[SPTC0001] dd', async ({ page }) => {
        await page.goto('http://localhost:5173/#/login');
        
        await page.locator('.el-input__inner').nth(0).fill('admin');
        await page.locator('.el-input__inner').nth(1).fill('admin');

        page.on('request', (request) => {
            const data = request.postDataJSON();
            console.log(1111, data)
            if (request.url() === 'http://localhost:5173/api/admin/login') {
                console.log(2222, data)
                expect(data).toEqual({
                    username: 'admin',
                    password: 'admin'
                });
            }
        })

        await page.locator('.el-button').click();
        // Expect a title "to contain" a substring.
    });
})


