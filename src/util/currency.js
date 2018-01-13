const COIN_MARKET_CAP = "https://api.coinmarketcap.com/v1/ticker/ethereum/";
import "whatwg-fetch";

export async function getDollarToETHRate(dollars) {
  let res = await fetch(COIN_MARKET_CAP);
  let json = await res.json();
  const { price_usd: rate } = json[0];
  return dollars / Number(rate);
}

export async function getETHToICashRate(amountInETH) {
  // mock api call
  await setTimeout(null, 2000);
  // mock price of Well to be 0.5 ether
  return amountInETH * 2;
}
