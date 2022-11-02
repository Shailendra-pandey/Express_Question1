const snapdeal = async (req, res, next) => {
    const tshirt = tshirtModel(sequelize, Sequelize);

    try {
        (async () => {
            const browser = await puppeteer.launch({
                executablePath: "/usr/bin/google-chrome-stable",
            });
            const page = await browser.newPage();
            await page.goto(
                "https://www.snapdeal.com/products/men-apparel-tshirts?sort=plrty"
            );

            const tshirtDetail = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll(".product-desc-rating ");
                items.forEach((item) => {
                    results.push({
                        title: item.querySelector(".product-title ").innerText,
                        price: item.querySelector(".product-price").innerText,
                    });
                });

                return results;
            });

            sequelize
                .sync()
                .then(() => {
                    console.log("table created");
                    tshirtDetail.forEach((newtshirt) => {
                        tshirt
                            .create({
                                title: newtshirt.title,
                                price: newtshirt.price,
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

            browser.close();
            return res.json("data added");
        })();
    } catch (error) {
        console.error(error);
    }
}

export default snapdeal;