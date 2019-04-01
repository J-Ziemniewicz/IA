const rp = require('request-promise');
const $ = require('cheerio');
const infoScraper = require('./infoScraper');
const url = 'https://gunfire.com/pl/menu/karabiny-i-karabinki-elektryczne-17201.html';

rp(url)
    .then(function (htmlString) {
        //success!
        // console.log(htmlString);
        // console.log($('div[id="component_projector_longdescription"]', htmlString).text());
        const aegUrls = [];
        const aegList = [];
        var x = $('div[class="product_wrapper col-md-4 col-xs-6"] a[class="product-name"]', htmlString).length;
        for (let i = 0; i < x; i++) {
            aegUrls.push($('div[class="product_wrapper col-md-4 col-xs-6"] a[class="product-name"]', htmlString)[i].attribs.href);
        };
        for (let i =0;i<aegUrls.length;i++){
            let {model,fps,price} = infoScraper(url);
            aegList.push([model,fps,price]);
        };
        console.log(aegUrls);
        console.log(aegList);
        // return aegList;
        
        // return Promise.all(
        //     aegUrls.map(function (url) {
        //         var {model,fps,price} = infoScraper(url);
        //         return {model,fps,price};
        //         // return {model,fps,price} = infoScraper(url);
        //         // return infoScraper(url);
        //     })
        // );
    })
    // .then(function (aeg) {
    //     console.log(aeg);
    // })
    .catch(function (err) {
        //handle error
        console.log(err);
    });