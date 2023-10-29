const fs = require('fs');
const scrapers = require('./scraper');
/*
const scrapeController = async (browserInstance) => {
    const url = "https://phongtro123.com/";
    const indexs = [1, 2, 3, 4];
    try {
        let browser = await browserInstance;
        // Gọi hàm ở file Scraper
        let categories = await scrapers.scrapeCategory(browser, url);
        const selectedCategories = categories.filter((category, index) => indexs.some(i => i===index));
        
        await scrapers.scraper(browser, selectedCategories[0].link)
    } catch (e) {
        console.log('Lỗi ở ScrapeController: '+ e);
    }
}
*/
const scrapeController = async (browserInstance) => {
    const url = "http://portal.core.edu.au/conf-ranks/";
    
    try {
        let browser = await browserInstance;
        // Gọi hàm ở file Scraper

        /*
        // ----------------------------
        // Scrape thông tin hội nghị từ core portal rồi lưu vào data.jon

        // Lấy jump page (trang sau khi click vô search)
        let jumpPage = await scrapers.scarpeJumpPage(browser, url);

        // Vô từng jump page để đọc thông tin các table

        for (let i = 1; i < 2; i++) {
            
            // Lấy danh sách hội nghị trong table
            let listData = await scrapers.scraper(browser, jumpPage + i);

            // Tìm link tương ứng với từng hội nghị
            for(let j = 0; j < listData.length; j++) {
                let link = await scrapers.searching(browser, listData[j].title);
                listData[j].link = link;
                // Tạo một thời gian ngẫu nhiên từ 1 đến 3 giây (1000ms = 1 giây)
                const randomDelay = Math.floor(Math.random() * 2000) + 1000; // Từ 1000ms đến 3000ms

                // Sử dụng setTimeout để tạm dừng thực thi mã trong khoảng thời gian ngẫu nhiên
                setTimeout(function () {
                }, randomDelay);
                
            }
            //console.log(listData);
            console.log('To be continue ...');

            // Chuyển object thành chuỗi JSON
            const jsonData = JSON.stringify(listData, null, 2);

            // Ghi danh sách hội nghị vào tệp data.json
            fs.writeFileSync('data.json', jsonData);

            

            console.log('Dữ liệu đã được ghi vào data.json.');
        }
        //----------------------------
        */
        // Tìm kiếm thông tin nâng cao đối với từng hội nghị
        await scrapers.scrapeSubmitionDate(browser);

    } catch (e) {
        console.log('Lỗi ở ScrapeController: '+ e);
    }
}



module.exports = scrapeController;