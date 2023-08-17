const config = {
    use:
    {
        browserName: 'chromium',
        headless: false,
        launchOptions: { slowMo: 50 },
        screenshot: 'only-on-failure',
        video: 'on',
    },
    workers: 1, //By default all the test are run in parallel but we can limit the parallel run by keeping workers as 1
    reporter: 'allure-playwright',
}

module.exports = config