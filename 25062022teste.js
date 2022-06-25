const axios = require("axios");
const agora = new Date().getTime();
const fs = require("fs");



// colocar

let endpoints = [
  `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1367042399&to=${agora}`,
  `https://api.llama.fi/charts/Ethereum`,

  //btc
  `https://data.messari.io/api/v1/assets/bitcoin/metrics/act.addr.cnt/time-series?start=2013-01-01&end=2016-01-01&interval=1d`,
  `https://data.messari.io/api/v1/assets/bitcoin/metrics/act.addr.cnt/time-series?start=2016-01-02&end=2019-01-02&interval=1d`,
  `https://data.messari.io/api/v1/assets/bitcoin/metrics/act.addr.cnt/time-series?start=2019-01-02&end=2022-06-25&interval=1d`,
];

axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((data) => {
  let result0 = data[0];
  let result1 = data[1];
  let result3 = data[2];
  let result4 = data[3];
  let result5 = data[4];

  let geckoPrice = result0.data.prices;
  let geckoVolume = result0.data.total_volumes;
  let geckomktCap = result0.data.market_caps;
  let lhamaTVL = result1.data;
  let lhamaTVL1 = lhamaTVL.map(Object.values);

  let messariAddress1 = result3.data.data.values;
  let messariAddress2 = result4.data.data.values;
  let messariAddress3 = result5.data.data.values;
  let messariAddressCount = messariAddress1.concat(messariAddress2,messariAddress3);




  console.log(messariAddressCount);

// volume,preço e mkt cap do coingecko
  var csv = geckoPrice
    .map(function (d) {
      return d.join();
    })
    .join("\n");

  var csv2 = geckoVolume
    .map(function (d) {
      return d.join();
    })
    .join("\n");

  var csv3 = geckomktCap
    .map(function (d) {
      return d.join();
    })
    .join("\n");
// tvl defi lhama
  var csv4 = lhamaTVL1
    .map(function (d) {
      return d.join();
    })
    .join("\n");
    //messari address count


    var csv5 = messariAddressCount
    .map(function (d) {
      return d.join();
    })
    .join("\n");


  fs.writeFileSync(".geckoPrice.csv", csv);
  fs.writeFileSync(".geckoVolume.csv", csv2);
  fs.writeFileSync(".geckoMktCap.csv", csv3);
  fs.writeFileSync(".lhamaTVL.csv", csv4);
  fs.writeFileSync(".messariAddressCount.csv", csv5);

  
});
