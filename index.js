const express = require('express'); // Adding Express
const app = express(); // Initializing Express
const puppeteer = require('puppeteer'); // Adding Puppeteer
const cron = require('node-cron');
var inProfile=false
min='01'
hour='01'
var profile=''
const delay = require('delay');
const iPhone = puppeteer.devices['iPhone 10'];


(async () => {
    // const br=await puppeteer.launch();
    const br = await puppeteer.launch({headless:true, args: ["--disable-gpu",
            "--disable-dev-shm-usage",
            "--no-sandbox",
            "--disable-setuid-sandbox"]
    });
    const pg = await br.newPage();
    await pg.emulate(iPhone);
    const response = await pg.goto('https://www.instagram.com/accounts/login/', { waitUntil: ['load', 'networkidle0', 'domcontentloaded', 'networkidle2'] });
    // console.log(await response.text());
    // await pg.click('[class="loginLink"]')
    await delay(2000)
    // await pg.screenshot({ path: 'test.png' })
    // Wait for log in form

    await Promise.all([
        pg.waitForSelector('[name="username"]'),
        pg.waitForSelector('[name="password"]')
    ]);
    // await pg.screenshot({path:'test.png'})
    ///give credentials
    await delay(500)
    await pg.type('[name="username"]', '_na_vin')
    await delay(100)
    await pg.type('[name="password"]', 'Navin@navin12345')
    await delay(100)
    await pg.click('[type="submit"]')
    await delay(100)

    await pg.waitForSelector('[class="sqdOP yWX7d    y3zKF     "]')
    await pg.click('[class="sqdOP yWX7d    y3zKF     "]')
    await delay(1000)

    await pg.waitForSelector('[class="mXkkY KDuQp"]')
    await pg.click('[class="mXkkY KDuQp"]')
    await delay(2000)
    await  pg.waitForSelector('[class="aOOlW   HoLwm "]')
    await pg.click('[class="aOOlW   HoLwm "]')

    await delay(1000)
    const btn = await pg.$x("//button[contains(text(), 'Not Now')]");
    if (btn.length > 0) {
        await btn[0].click();
    } else {
        console.log("btn not found");
    }

    
    await delay(10000)
    
    const profileDiv = await pg.$x(`//div[contains(text(),'${profile}')]`);
    if (profileDiv.length > 0) {
        await profileDiv[0].click();
    } else {
        console.log("profileDiv not found");
    }
    await delay(1000)
    inProfile=true
    console.log(inProfile);
    console.log("waiting");
      cron.schedule('30 22 * * *', async() => {
        await delay(1000)
        await pg.waitForSelector('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]')
        await pg.click('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]')
        await delay(1000)
        await pg.type('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]',
            'good Night Lakshmamma!!!!')

            await pg.type('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]',
            'Love u!!❤️')
            console.log(`${min} ${hour} * * 0-7`);
            await pg.waitForSelector('[class="sqdOP yWX7d    y3zKF     "]')
            const [send] = await pg.$x('//button[contains(.,"Send")]');
            await delay(1000)
            await send.click({ delay: 100 });
      }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
      });
      
      cron.schedule('00 07 * * *', async() => {
        await pg.waitForSelector('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]')
        await pg.click('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]')
    
        await pg.type('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]',
            'good morning Lakshmamma!!!!')
            console.log(`${min} ${hour} * * 0-7`);
            await pg.waitForSelector('[class="sqdOP yWX7d    y3zKF     "]')
            const [send] = await pg.$x('//button[contains(.,"Send")]');
            await delay(1000)
            await send.click({ delay: 100 });
      }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
      });

      cron.schedule('00 13 * * *', async() => {
        await pg.waitForSelector('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]')
        await pg.click('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]')
    
        await pg.type('[class="                     Igw0E     IwRSH      eGOV_        vwCYk                                        ItkAi                                                                       "]',
            'good afternoon Lakshmamma!!!!')
            console.log(`${min} ${hour} * * 0-7`);
            await pg.waitForSelector('[class="sqdOP yWX7d    y3zKF     "]')
            const [send] = await pg.$x('//button[contains(.,"Send")]');
            await delay(1000)
            await send.click({ delay: 100 });
      }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
      });
      
  

})();



app.get('/', (req, res) => {
    if (req.query.hour) {
        time = req.query.hour
    }
    if (req.query.min) {
        time = req.query.morningTime
    }



    if (req.query.profile) {
        profil = req.query.profil
    }


    res.status(200).json({ message: `${'success'}`, profile: profile })
})

// Making Express listen on port 7000
// app.listen(7000, function () {
//     console.log('Running on port 7000.');
// });


app.listen(process.env.PORT, '0.0.0.0');