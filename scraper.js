/*
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');


puppeteerExtra.use(Stealth());
*/
const fs = require('fs');

const scrapeCategory = (browser, url) => new Promise(async(resolve, reject) => {
    try {
        let page = await browser.newPage();
        console.log(">> Mở tab mới ...");

        /*
        await newpage.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');        
        */

        await page.goto(url);
        console.log(">> Truy cập vào "+ url);
        
        await page.waitForSelector("#webpage");
        console.log(">> Website đã load xong ...");
        
        /*
            eval sẽ query selector tất cả thẻ li là con của ul, ul là con của thẻ có id là navbar-menu
            sau đó truyền những element select được vào callback
            function eval = (string, callback) => {
                let elements = queryselector(tring)
                callback()
            }
        */
        const dataCategory = await page.$$eval('#navbar-menu > ul > li', els => {
            result = els.map(el => {
                return {
                    category: el.querySelector('a').innerText,
                    link: el.querySelector('a').href
                }
            })
            return result;
        })

        // Đóng tab (page phongtro123)
        await page.close();
        console.log(">> Tab đã đóng.")

        resolve(dataCategory);

    } catch (error) {
        console.log("Lỗi ở scrapeCategory: "+ error);
        reject(error);
    }
})

const scraper = (browser, url) => new Promise(async(resolve, reject) => {
    try {
        let page = await browser.newPage();
        console.log(">> Đã mở tab mới ...");

        await page.goto(url);
        console.log(">> Đã truy cập vào trang: "+ url);

        await page.waitForSelector("#container");
        console.log(">> Đã load xong ...");

        const scrapeData = [];

        const data = await page.$$eval('#search > table tr td', tds => tds.map((td) => {
            return td.innerText;
        }))

        let currentIndex = 0;

        while (currentIndex < data.length) {
            const obj = {
                title: data[currentIndex],
                Acronym: data[currentIndex + 1],
                Source: data[currentIndex + 2],
                Rank: data[currentIndex + 3],
                Note: data[currentIndex + 4],
                DBLP: data[currentIndex + 5],
                PrimaryFoR: data[currentIndex + 6],
                Comments: data[currentIndex + 7],
                AverageRating: data[currentIndex + 8],
            };
            scrapeData.push(obj);
            currentIndex += 9
        };
        
        //console.log(scrapeData);

        await page.close();
        console.log(">> Tab đã đóng.");
        resolve(scrapeData);

    } catch (error) {
        reject(error);
    }
})



const scarpeJumpPage = (browser, url) => new Promise(async(resolve, reject) => {
    try {
        let page = await browser.newPage();
        console.log(">> Mở tab mới ...");

        await page.goto(url);
        console.log(">> Truy cập vào "+ url);
        
        await page.waitForSelector("#container");
        console.log(">> Website đã load xong ...");
        
        await page.$eval('#searchForm', form => form.submit());
        await page.waitForNavigation();

        // Đóng tab 
        await page.close();
        console.log(">> Tab đã đóng.")

        resolve(page.url().slice(0, -1));

    } catch (error) {
        console.log("Lỗi ở scarpeJumpPage: "+ error);
        reject(error);
    }
})

const searching = async (browser, keyword) => {
    try {
        const maxLinks = 4; // Số liên kết cần thu thập
        let links = [];

        let page = await browser.newPage();
        console.log(">> Mở tab mới ...");

        await page.goto('https://www.google.com/');
        await page.waitForSelector('#APjFqb');
        await page.keyboard.sendCharacter(keyword + ' 2023');
        await page.keyboard.press('Enter');

        await page.waitForSelector('#search');

        while (links.length < maxLinks) {
            const linkList = await page.$$eval('#search a', (els) => {
                const result = [];
                const googleScholarDomain = 'scholar.google'; // Tên miền của Google Scholar
                const googleTranslateDomain = 'translate.google';
                const googleDomain = 'google.com';
                for (const el of els) {
                    const href = el.href;
                    // Kiểm tra xem liên kết có chứa tên miền của Google Scholar không
                    if (href && !href.includes(googleScholarDomain) && !href.includes(googleTranslateDomain) && !href.includes(googleDomain)) {
                        result.push({
                            link: href
                        });
                    }
                }
                return result;
            });

            links = links.concat(linkList.map(item => item.link));

            // Nếu links có nhiều hơn maxLinks, cắt bớt đi
            if (links.length > maxLinks) {
                links = links.slice(0, maxLinks);
            }
            
            if (links.length < maxLinks) {
                // Chưa đủ liên kết, tiếp tục tìm kiếm bằng cách lướt xuống
                await page.keyboard.press('PageDown');
                await page.waitForTimeout(2000); // Đợi trang tải xong
            }
        }

        //console.log('Title: ' + keyword);
        //console.log(links);

        await page.close();
        return links.slice(0, maxLinks);
    } catch (error) {
        console.log('Error in searching: ' + error);
        throw error;
    }
};

const scrapeSubmitionDate = async (browser) => {
    try {
        let jsonData = fs.readFileSync('data.json', 'utf8');
        let listConference = JSON.parse(jsonData);
        console.log(listConference);
        
    } catch (error) {
        console.log('Error in scrapeSubmitionDate: ' + error);
        throw error;
    }
};



module.exports = {
    scrapeCategory,
    scraper,
    scarpeJumpPage,
    searching,
    scrapeSubmitionDate
};

