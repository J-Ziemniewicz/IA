const rp = require('request-promise');
const $ = require('cheerio');
const infoScraper = require('./infoScraper');
const url = 'https://www.specshop.pl/pol_m_Airsoft_Repliki-broni-ASG_Repliki-karabinow-elektryczne-324.html';

rp(url)
    .then(function (htmlString) {
        //success!
        // console.log(htmlString);
        // console.log($('div[id="component_projector_longdescription"]', htmlString).text());
        const aegUrls = [];
        var x = $('div[class="product_wrapper_sub"] a[class="product-name"]', htmlString).length;
        for (let i = 0; i < x; i++) {
            aegUrls.push($('div[class="product_wrapper_sub"] a[class="product-name"]', htmlString)[i].attribs.href);
        }
        // console.log(aegUrls);
        return Promise.all(
            aegUrls.map(function (url) {
                return infoScraper('https://www.specshop.pl' + url);
            })
        );
    })
    // .then(function(aeg) {
    //     console.log(aeg);
    //   })
    .catch(function (err) {
        //handle error
        console.log(err);
    });