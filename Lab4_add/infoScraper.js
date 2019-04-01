const rp = require('request-promise');
const $ = require('cheerio');

// Not working for belowe link
// nie ma \n w tekście 
// trzeba dzielić po <br> ???
// const url = 'https://www.specshop.pl/product-pol-16703-ARES-Amoeba-Airsoft-Replika-karabinka-Octarms-9-Keymod-Assault-Rifle-M4-KM9-BK.html';

// jest \n w tekście
// Working for belowe link
// const url = 'https://gunfire.com/pl/products/replika-karabinka-rra-sa-e14-edge-tm-half-tan-1152221329.html';

const infoScraper = function (url) {
    return rp(url)
        .then(function (htmlString) {
            var model= $('td[class="n54117_item_b1"] > div[class="n54117_item_b_sub"]', htmlString).first().text();
            var fps= $('td[class="n54117_item_b2"] > div[class="n54117_item_b_sub"]', htmlString).eq(1).text();
            var price= $('.projector_price_value', htmlString).text();
            fps = fps.split(" ")[0];
            if(fps.startsWith('~')){
                fps = Number(fps.substring(1,fps.length));
            };
            
            price = Number(price.substring(0,price.length-6));
            return {
                model:model,
                fps:fps,
                price:price
            };
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
};

module.exports = infoScraper;