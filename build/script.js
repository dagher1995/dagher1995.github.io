let btc_current_price_node = document.getElementById("btc_current_price");
let eth_current_price_node = document.getElementById("eth_current_price");
let xrp_current_price_node = document.getElementById("xrp_current_price");
let bnb_current_price_node = document.getElementById("bnb_current_price");

let capital_investmetn_node = document.getElementById("capital_investmetn");
let total_wallet_node = document.getElementById("total_wallet_node");
let earnings_value_node = document.getElementById("earnings_value_node");

let btc_owned_node = document.getElementById("btc-owned");
let eth_owned_node = document.getElementById("eth-owned");
let xrp_owned_node = document.getElementById("xrp-owned");
let bnb_owned_node = document.getElementById("bnb-owned");


//OMR 
let dagher_paid = 50;
let laith_paid = 50;

//calculating capital investment in USD
let capital_investmetn = parseFloat((dagher_paid + laith_paid) / 0.385).toFixed(3);
capital_investmetn_node.innerHTML = "$ " + capital_investmetn

//coins owned
let btc_owned = 0.0;
let eth_owned = 0.0395604;
let xrp_owned = 165.00;
let bnb_owned = 0.000121477;

btc_owned_node.innerHTML = parseFloat(btc_owned).toFixed(2);
eth_owned_node.innerHTML = eth_owned;
xrp_owned_node.innerHTML = parseFloat(xrp_owned).toFixed(2);
bnb_owned_node.innerHTML = bnb_owned;

let total_wallet = 0.0;
total_wallet_node.innerHTML ="$" + total_wallet;

let btc_owned_value = 0.0;
let eth_owned_value = 0.0;
let xrp_owned_value = 0.0;
let bnb_owned_value = 0.0;

let earnings_value = total_wallet - capital_investmetn;
earnings_value_node.innerHTML = "$" + parseFloat(earnings_value).toFixed(3);

// selected card nodes
let selected_icon_node = document.getElementById("selected_icon");
let selected_coin_name_node = document.getElementById("selected_coin_name");
let selected_coin_name_short_node = document.getElementById("selected_coin_name_short");
let coin_selected_owned_node = document.getElementById("coin_selected_owned");
let coin_selected_owned_value_node = document.getElementById("coin_selected_owned_value");
let coin_selected_current_price_node = document.getElementById("coin_selected_current_price");

let coin_selected = 1;

function justSet(name, short_name, link, result, owned) {
    selected_coin_name_node.innerHTML = name;
    selected_coin_name_short_node.innerHTML = short_name;
    selected_icon_node.src = link;
    
    if(coin_selected == 3) {
        coin_selected_owned_node.innerHTML = parseFloat(owned).toFixed(2);
        coin_selected_current_price_node.innerHTML = "$" + parseFloat(result).toFixed(4);
    } else {
        coin_selected_current_price_node.innerHTML = "$" + parseFloat(result).toFixed(2);
    }
    coin_selected_owned_value_node.innerHTML = "≈ $" + parseFloat(owned * result).toFixed(2);
}

function setupCoinSelected(result) {
    if (coin_selected === 1) {
        justSet("Bitcoin", "BTC", "icons/bitcoin.svg", result, btc_owned);
    } else if (coin_selected === 2) {
        justSet("Ethereum", "ETH", "icons/ethereum.svg", result, eth_owned);
    } else if (coin_selected === 3) {
        justSet("Ripple", "XRP", "icons/ripple.svg", result, xrp_owned);
    } else if (coin_selected === 4) {
        justSet("Binance", "BNB", "icons/bnb.svg", result, bnb_owned);
    }
}

setupCoinSelected();

//URL 
const btc_url='https://api3.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
const eth_url='https://api3.binance.com/api/v3/ticker/price?symbol=ETHUSDT';
const xrp_url='https://api3.binance.com/api/v3/ticker/price?symbol=XRPUSDT';
const bnb_url='https://api3.binance.com/api/v3/ticker/price?symbol=BNBUSDT';

//make delay
const delay = ms => new Promise(res => setTimeout(res, ms));

function getPrice(url) {
    Http.open("GET", url);
    Http.send();
}

const Http = new XMLHttpRequest();

function calculateTotalWallet() {
    total_wallet = btc_owned_value + eth_owned_value + xrp_owned_value + bnb_owned_value;
    earnings_value = total_wallet - capital_investmetn;
    total_wallet_node.innerHTML = "$" + parseFloat(total_wallet).toFixed(3);
    earnings_value_node.innerHTML = "$" + parseFloat(earnings_value).toFixed(3);
}

function getCurrentPrice(url, node, number) {
    getPrice(url);
    Http.onreadystatechange = (e) => {
        let json = JSON.parse(Http.responseText);
        let result = parseFloat(JSON.stringify(json.price).replace("\"", "").replace("\"", ""));
        
        if(number === 1) {
            btc_owned_value = result * btc_owned;
            node.innerHTML = "$" + parseFloat(result).toFixed(2);
            coin_selected = 1;
            setupCoinSelected(result);
        } else if(number === 2) {
            eth_owned_value = result * eth_owned;
            node.innerHTML = "$" + parseFloat(result).toFixed(2);
            coin_selected = 2;
            setupCoinSelected(result);
        } else if(number === 3) {
            xrp_owned_value = result * xrp_owned;
            node.innerHTML = "$" + parseFloat(result).toFixed(4);
            coin_selected = 3;
            setupCoinSelected(result);
        } else if(number === 4) {
            bnb_owned_value = result * bnb_owned;
            node.innerHTML = "$" + parseFloat(result).toFixed(2);
            coin_selected = 4;
            setupCoinSelected(result);
        }
        calculateTotalWallet()
    }
}

const GetPrices = async () => {
    // let i = 0;
    while(true) {
        getCurrentPrice(btc_url, btc_current_price_node, 1);
        await delay(2000);
        getCurrentPrice(eth_url, eth_current_price_node, 2);
        await delay(2000);
        getCurrentPrice(xrp_url, xrp_current_price_node, 3);
        await delay(2000);
        getCurrentPrice(bnb_url, bnb_current_price_node, 4);
        await delay(2000);
        // i++;
    }
    
}

GetPrices();