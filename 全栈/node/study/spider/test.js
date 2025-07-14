const {
  Builder,
  Browser,
  By,
  Key,
  until
} = require('selenium-webdriver')

;
(async function example() {
  // 创建一个谷歌浏览器
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    // 跳转到对应页面
    await driver.get('https://www.lagou.com/')
    var searchForm = await driver.findElement(By.id('search_input')).sendKeys('前端', Key.RETURN);
    // await driver.findElement(By.id('kw')).sendKeys('test', Key.RETURN)
    //   await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
    console.log(driver)
  } finally {
    //关闭浏览器
    // await driver.quit()
  }
})()
