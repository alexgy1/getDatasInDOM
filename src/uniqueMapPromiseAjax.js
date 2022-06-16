const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const URLS = require('../entry/urls.js');

const getContent2 = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
      const map = genMap(res);
      resolve(map);
    });
  });
};

const makePromiseArr = (url) => {
  return axios.get(url);
};

const serialPromise = (URLS) => {
  let promisesArr = URLS.map((url) => makePromiseArr(url));
  return new Promise((resolve, reject) => {
    Promise.all(promisesArr).then((result) => {
      let maps = result.map((res) => genMap(res));
      let uniquMap = maps.reduce((map, cur) => {
        for (let key in cur) {
          if (!map[key]) {
            map[key] = cur[key];
          }
        }
        return map;
      }, {});

      resolve(uniquMap);
    });
  });
};

const genMap = (res) => {
  const $ = cheerio.load(res.data);
  let map = {};
  $('.Detail_arguItem__1CcyM').each((i, elem) => {
    let key = $(elem).find('.Detail_arguLabel__1oQ5h').text();
    map[key] = key;
  });
  return map;
};
const saveToFile = ({ map, url = null, $ = null }) => {
  let id, name;
  if (url) {
    let urlArr = url.split('/');
    id = urlArr[urlArr.length - 1];
    name = $('.Info_product-name__2Z9Dk').text();
  }

  if (!url) {
    id = 'test';
    name = 'test';
  }
  fs.writeFileSync(`./datas/${id}_${name}.json`, JSON.stringify(map));
};

// test;
// let requestURL = 'https://expo.tuya.com/product/337733';
// getContent2(requestURL).then((map) => {
//   console.log('map');
//   console.log(map);
//   saveToFile({ map });
// });

serialPromise(URLS).then((res) => {
  //res is unique map
  console.log('res', Object.keys(res).length);
  saveToFile({ map: res });
});

module.exports = {
  getContent2,
};
