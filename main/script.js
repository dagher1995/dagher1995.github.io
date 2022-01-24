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

let TOTAL_TABLE_USD = document.getElementById('total-table-usd');
let TOTAL_TABLE_OMR = document.getElementById('total-table-omr');
let ORIGINAL_TABLE_USD = document.getElementById('original-table-usd');
let ORIGINAL_TABLE_OMR = document.getElementById('original-table-omr');
let PROFIT_TABLE_USD = document.getElementById('profit-table-usd');
let PROFIT_TABLE_OMR = document.getElementById('profit-table-omr');

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

let btc_now_value = 0.0;
let eth_now_value = 0.0; 
let xrp_now_value = 0.0;
let bnb_now_value = 0.0;

//people paid
let dagher = 50;
let laith = 50;
let ghaiht = 0;
let suliman = 0;

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

function updateSummary() {
    total_usd = parseFloat(btc_now_value) + parseFloat(eth_now_value) + parseFloat(xrp_now_value) + parseFloat(bnb_now_value);
    TOTAL_TABLE_USD.innerHTML =  parseFloat(total_usd).toFixed(3) + " $";
    TOTAL_TABLE_OMR.innerHTML = "OMR " + parseFloat(total_usd*0.385).toFixed(3);
    let origin = parseFloat(dagher+laith+ghaiht+suliman)
    ORIGINAL_TABLE_USD.innerHTML = parseFloat(origin / 0.385).toFixed(3) + " $";
    ORIGINAL_TABLE_OMR.innerHTML = "OMR " + parseFloat(origin).toFixed(3);
    let profit_usd = parseFloat(total_usd - (origin/0.385)).toFixed(3);
    if(profit_usd > 0) {
        PROFIT_TABLE_USD.style.color = "green";
        PROFIT_TABLE_OMR.style.color = "green";
    } else {
        PROFIT_TABLE_USD.style.color = "red";
        PROFIT_TABLE_OMR.style.color = "red";
    }
    PROFIT_TABLE_USD.innerHTML = parseFloat(profit_usd).toFixed(3) + " $";
    PROFIT_TABLE_OMR.innerHTML = "OMR " + parseFloat(profit_usd*0.385).toFixed(3);
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
            btc_now_value = (n * btc_owned).toFixed(2)
            if(btc_now_value > btc_buy_value) {
                BTC_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                BTC_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            BTC_VALUE.innerHTML = "$ " + btc_now_value;
            btc_last_price = n;
        } else if(number === 2) {
            if(n > eth_last_price) {
                ETH_PRICE.style.color = "green";
            } else if(n < eth_last_price) {
                ETH_PRICE.style.color = "red";
            } 
            node.innerHTML = "$ " + n;
            eth_now_value = (n * eth_owned).toFixed(2)
            if(eth_now_value > eth_buy_value) {
                ETH_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                ETH_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            ETH_VALUE.innerHTML = "$ " + eth_now_value;
            eth_last_price = n;
        } else if(number === 3) {
            if(n > xrp_last_price) {
                XRP_PRICE.style.color = "green";
            } else if(n < xrp_last_price) {
                XRP_PRICE.style.color = "red";
            } 
            node.innerHTML = "$ " + n;
            xrp_now_value = (n * xrp_owned).toFixed(2)
            if(xrp_now_value > xrp_buy_value) {
                XRP_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                XRP_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            XRP_VALUE.innerHTML = "$ " + xrp_now_value;
            xrp_last_price = n;
        } else if(number === 4) {
            if(n > bnb_last_price) {
                BNB_PRICE.style.color = "green";
            } else if(n < bnb_last_price) {
                BNB_PRICE.style.color = "red";
            } 
            node.innerHTML = "$ " + n;
            bnb_now_value = (n * bnb_owned).toFixed(2)
            if(bnb_now_value > bnb_buy_value) {
                BNB_VALUE_CONTAINER.style.backgroundColor = "green";
            } else {
                BNB_VALUE_CONTAINER.style.backgroundColor = "red";
            }
            BNB_VALUE.innerHTML = "$ " + bnb_now_value;
            bnb_last_price = n;
        }
    }
}

const GetPrices = async () => {
    // let i = 0;
    while (true) {
        getCoinPrice(btc_url, BTC_PRICE, 1);
        updateSummary()
        await delay(2000);
        getCoinPrice(eth_url, ETH_PRICE, 2);
        updateSummary()
        await delay(2000);
        getCoinPrice(xrp_url, XRP_PRICE, 3);
        updateSummary()
        await delay(2000);
        getCoinPrice(bnb_url, BNB_PRICE, 4);
        updateSummary()
        await delay(2000);

        // i++;
    }
  };

  GetPrices();
