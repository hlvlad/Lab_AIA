const request = require('request');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

var req_url = 'https://www.fragrancedirect.co.uk/eu/fd-beauty/fragrance/?listing=true&sz=80';

request({uri: req_url}, function(error, response, body){
    if(!error && response.statusCode === 200){
        const {document} = new JSDOM(body).window;
        let titlesList = document.querySelectorAll('.name-link');
        let pricesList = document.querySelectorAll('.price-sales');
        let parsed = [];
        for(let i = 0; i < titlesList.length; i++) {

            let tmp = titlesList[i].textContent.trim().split(" ");
            let size = tmp.pop();
            let title = tmp.join(' ');
            size.slice(0, size.length - 3);
            size = parseInt(size);

            let price = pricesList[i].textContent.split(" ").pop().replace(',','.');
            price = parseFloat(price);
            parsed[i] = {};
            parsed[i].title = title;
            parsed[i].uprice = price/size;
        }
        parsed.sort((a, b) => (a.uprice > b.uprice) ? 1 : -1);
        parsed.forEach(p => console.log(p.title + ": Unit price: " + p.uprice.toPrecision(4) + " Euros/ml"));
    }
});