const rp = require('request-promise');
const $ = require('cheerio');

// Not working for belowe link
// nie ma \n w tekście 
// trzeba dzielić po <br> ???
// const url = 'https://www.specshop.pl/product-pol-16703-ARES-Amoeba-Airsoft-Replika-karabinka-Octarms-9-Keymod-Assault-Rifle-M4-KM9-BK.html';

// jest \n w tekście
// Working for belowe link
const url = 'https://www.specshop.pl/product-pol-18109-ASG-Replika-karabinka-CZ-805-BREN-A1-Desert-Proline-18200.html';

const infoScraper = function(url){
    return rp(url)
    .then(function (htmlString) {
        var text = $('div[id="component_projector_longdescription"]', htmlString).text();
        console.log(text);
        var textSplit = text.split("\n");
        console.log(textSplit);
        let fps = "";
        let model = "";
        if (null != textSplit) {
            textSplit.forEach(function (item) {
                if (item.startsWith("Model:")) {
                    model = item;
                }
                if (item.includes("fps")) {
                    // console.log(item);
                    fps = item ;
                }
            });
        }
        return{
            model,
            fps,
            price: $('.projector_price_value', htmlString).text(),
        };
    })
    .catch(function (err) {
        //handle error
        console.log(err);
    });
};
infoScraper(url);
module.exports= infoScraper;