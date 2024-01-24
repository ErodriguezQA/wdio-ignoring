const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page.js')
const SecurePage = require('../pageobjects/secure.page.js')
const ExcelHandler = require('../excel/sheetHandler.js')

describe('My Login application', async() => {
    const getUsernames = await ExcelHandler.SheetHandler("Username");
    for(const username of getUsernames){
        it(`Testing username ${username.toString()}`, async () => {
            await LoginPage.open()
            await LoginPage.login(username.toString(), 'SuperSecretPassword!')
            await expect(SecurePage.flashAlert).toBeExisting()
            await expect(SecurePage.flashAlert).toHaveTextContaining(
                'You logged into a secure area!')
        })
    }

})

