let BTC_PRICE = document.getElementById('btc-price');
let ETH_PRICE = document.getElementById('eth-price');
let XRP_PRICE = document.getElementById('xrp-price');
let BNB_PRICE = document.getElementById('bnb-price');

let BTC_OWNED = document.getElementById('btc-owned');
let ETH_OWNED = document.getElementById('eth-owned');
let XRP_OWNED = document.getElementById('xrp-owned');
let BNB_OWNED = document.getElementById('bnb-owned');

let BTC_VALUE = document.getElementById('btc-value');
let ETH_VALUE = document.getElementById('eth-value');
let XRP_VALUE = document.getElementById('xrp-value');
let BNB_VALUE = document.getElementById('bnb-value');

let BTC_VALUE_CONTAINER = document.getElementById('btc-value-container');
let ETH_VALUE_CONTAINER = document.getElementById('eth-value-container');
let XRP_VALUE_CONTAINER = document.getElementById('xrp-value-container');
let BNB_VALUE_CONTAINER = document.getElementById('bnb-value-container');

const btc_url='https://api3.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
const eth_url='https://api3.binance.com/api/v3/ticker/price?symbol=ETHUSDT';
const xrp_url='https://api3.binance.com/api/v3/ticker/price?symbol=XRPUSDT';
const bnb_url='https://api3.binance.com/api/v3/ticker/price?symbol=BNBUSDT';

btc_last_price = 0.0;
eth_last_price = 0.0;
xrp_last_price = 0.0;
bnb_last_price = 0.0;

let btc_owned = 0.0;
let eth_owned = 0.0395604;
let xrp_owned = 165.0;
let bnb_owned = 0.00121477;

// values in OMR converted to usd
let btc_buy_value = 0.0 / 0.385;
let eth_buy_value = 50.0 / 0.385; 
let xrp_buy_value = 50.0 / 0.385;
let bnb_buy_value = 0.5;

BTC_OWNED.innerHTML = "لدينا: " + btc_owned;
ETH_OWNED.innerHTML = "لدينا: " + eth_owned;
XRP_OWNED.innerHTML = "لدينا: " + xrp_owned;
BNB_OWNED.innerHTML = "لدينا: " + bnb_owned;

const delay = ms => new Promise(res => setTimeout(res, ms));

const Http = new XMLHttpRequest();
 

function getPrice(url) {
    Http.open("GET", url);
    Http.send();
}

function getCoinPrice(url, node, number) {
    getPrice(url)
    Http.onreadystatechange = (e) => {
        let json = JSON.parse(Http.responseText);
        let n = parseFloat(JSON.stringify(json.price).replace("\"", "").replace("\"", ""));
        // while (n.charAt(n.length - 1) == '0') {
        //     n = n.slice(0, -1);
        //   }

        if(number === 1) {
            if(n > btc_last_price) {
                BTC_PRICE.style.color = "green";
            } else if(n < btc_last_price) {
                BTC_PRICE.style.color = "red";
            } 
            node.innerHTML = "$ " + n;
            let value = (n * btc_owned).toFixed(2)
            if(value > btc_buy_value) {
                BTC_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                BTC_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            BTC_VALUE.innerHTML = "$ " + value;
            btc_last_price = n;
        } else if(number === 2) {
            if(n > eth_last_price) {
                ETH_PRICE.style.color = "green";
            } else if(n < eth_last_price) {
                ETH_PRICE.style.color = "red";
            } 
            node.innerHTML = "$ " + n;
            let value = (n * eth_owned).toFixed(2)
            if(value > eth_buy_value) {
                ETH_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                ETH_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            ETH_VALUE.innerHTML = "$ " + value;
            eth_last_price = n;
        } else if(number === 3) {
            if(n > xrp_last_price) {
                XRP_PRICE.style.color = "green";
            } else if(n < xrp_last_price) {
                XRP_PRICE.style.color = "red";
            } 
            node.innerHTML = "$ " + n;
            let value = (n * xrp_owned).toFixed(2)
            if(value > xrp_buy_value) {
                XRP_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                XRP_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            XRP_VALUE.innerHTML = "$ " + value;
            xrp_last_price = n;
        } else if(number === 4) {
            if(n > bnb_last_price) {
                BNB_PRICE.style.color = "green";
            } else if(n < bnb_last_price) {
                BNB_PRICE.style.color = "red";
            } 
            node.innerHTML = "$ " + n;
            let value = (n * bnb_owned).toFixed(2)
            if(value > bnb_buy_value) {
                BNB_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                BNB_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            BNB_VALUE.innerHTML = "$ " + value;
            bnb_last_price = n;
        }
    }
}

const GetPrices = async () => {
    // let i = 0;
    while (true) {
        getCoinPrice(btc_url, BTC_PRICE, 1);
        await delay(2000);
        getCoinPrice(eth_url, ETH_PRICE, 2);
        await delay(2000);
        getCoinPrice(xrp_url, XRP_PRICE, 3);
        await delay(2000);
        getCoinPrice(bnb_url, BNB_PRICE, 4);
        await delay(2000);

        // i++;
    }
  };

  GetPrices();
