const {test,expect} = require('@playwright/test');
const data = require('../testData/data.json');
const Login = require('../pageObjects/Login');

test('login test', async({page}) =>{

    const login = new Login(page)

    await page.goto(data.baseUrl+'/auth/login')
    const title = await page.title()
    expect(title).toBe('OrangeHRM')
    
    login.signIn(data.userName,data.password)
    await expect(page).toHaveURL(data.baseUrl+'/dashboard/inde', { timeout: 5000 })
})