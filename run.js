var easyimg = require('easyimage');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
var imageUrl = "./images/out.png";

var writeScreenshotToFile = function(image, err) {
    require('fs').writeFile(imageUrl, image, 'base64', function(err) {
        if (err) {
            console.log(err);
        } else {
            cropInFile({ width: 500, height: 500 }, { x: 500, y: 500 }, imageUrl);
        }
    });
};

var cropInFile = function(size, location, srcFile) {
    easyimg.crop({
            src: srcFile,
            dst: srcFile,
            cropwidth: size.width,
            cropheight: size.height,
            x: location.x,
            y: location.y,
            gravity: 'North-West'
        },
        function(err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
        });
};

// TODO: Insert autgenerated selenium commands here and pipe images out
driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.takeScreenshot().then(writeScreenshotToFile);
// driver.findElement(By.name('btnG')).click();
// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();