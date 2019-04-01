const rp = require('request-promise');
const $ = require('cheerio');
const sortJsonArray = require('sort-json-array');
const infoScraper = require('./infoScraper');
const url = 'https://gunfire.com/pl/menu/karabiny-i-karabinki-elektryczne-17201.html';

rp(url)
    .then(function (htmlString) {
        //success!
        const aegUrls = [];
        
        var x = $('div[class="product_wrapper col-md-4 col-xs-6"] a[class="product-name"]', htmlString).length;
        for (let i = 0; i < x; i++) {
            aegUrls.push($('div[class="product_wrapper col-md-4 col-xs-6"] a[class="product-name"]', htmlString)[i].attribs.href);
        };
        
        return Promise.all(
            aegUrls.map(function (url) {
                // var {model,fps,price} = infoScraper(url);
                // return {model,fps,price};
                // return {model,fps,price} = infoScraper(url);
                return infoScraper(url);
            })
        );
    })
    .then(function (aeg) {
        for (let i =aeg.length-1;i>0;i--){
            if(aeg[i].model ==""||aeg[i].fps==""){
                aeg.splice(i,1);
            }
        }
        for (let i= 0;i<aeg.length;i++){
            aeg[i].value = aeg[i].price/aeg[i].fps;
        }
        for (let i =aeg.length-1;i>0;i--){
            if(isNaN(aeg[i].value)){
                aeg.splice(i,1);
            }
        }
        console.log(sortJsonArray(aeg,'value'));
    })
    .catch(function (err) {
        //handle error
        console.log(err);
    });