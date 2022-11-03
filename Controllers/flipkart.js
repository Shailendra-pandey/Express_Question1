const puppeteer = require('puppeteer')
const Sequelize = require('sequelize')
const sequelize = require('../models')
const mobileModel = require('../models/mobile.model')

const flipkart = async (req, res, next) => {
    const mobile = mobileModel(sequelize, Sequelize);

    const url =
        "https://www.flipkart.com/search?q=mobiles&as=on&as-show=on&otracker=AS_Query_TrendingAutoSuggest_1_0_na_na_na&otracker1=AS_Query_TrendingAutoSuggest_1_0_na_na_na&as-pos=1&as-type=HISTORY&suggestionId=mobiles&requestId=461cb39b-f157-4cde-9add-3a0c836b952e";

    try {
        // let mobile_urls = [];

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { timeout: 0 });

        let mobile_urls = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll("._1fQZEK");
            items.forEach((item) => {
                results.push("https://www.flipkart.com" + item.getAttribute("href"));
            });
            return results;
        });

        for (var i = 0; i < mobile_urls.length; i++) {
            const newpage = await browser.newPage();
            await newpage.goto(mobile_urls[i], { timeout: 0 });
            const mobile_details = await newpage.evaluate(() => {
                let results = [];
                let items = document.body;
                let data = {};
                items.querySelectorAll("._3k-BhJ") &&
                    items.querySelectorAll("._3k-BhJ").forEach((i) => {
                        if (!i.querySelectorAll("._1hKmbr")) return;
                        const x = i.querySelectorAll("._1hKmbr").length;
                        for (let j = 0; j < x; j++) {
                            data[i.querySelectorAll("._1hKmbr")[j].innerText] =
                                i.querySelectorAll("._21lJbe")[j].innerText;
                        }
                    });
                results.push({
                    mobileName: items.querySelector(".aMaAEs .B_NuCI").innerText,
                    price: items.querySelector(".aMaAEs ._16Jk6d").innerText,
                    specification: data,
                });
                return results;
            });

            sequelize
                .sync()
                .then(() => {
                    console.log("table created");
                    mobile_details.forEach((m) => {
                        mobile
                            .create({
                                mobileName: m.mobileName,
                                price: m.price,
                                specification: m.specification,
                            })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        browser.close();
        return res.send("saved");
    } catch (error) {
        return next("can't save this time");
        console.error(error);
    }
}

export default flipkart