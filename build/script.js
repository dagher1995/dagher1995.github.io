let btc_current_price_node = document.getElementById("btc_current_price");
let eth_current_price_node = document.getElementById("eth_current_price");
let xrp_current_price_node = document.getElementById("xrp_current_price");
let bnb_current_price_node = document.getElementById("bnb_current_price");

let capital_investmetn_node = document.getElementById("capital_investmetn");

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
let eth_owned = 0.039;
let xrp_owned = 165.00;
let bnb_owned = 0.0004;

btc_owned_node.innerHTML = parseFloat(btc_owned).toFixed(2);
eth_owned_node.innerHTML = eth_owned;
xrp_owned_node.innerHTML = parseFloat(xrp_owned).toFixed(2);
bnb_owned_node.innerHTML = bnb_owned;

