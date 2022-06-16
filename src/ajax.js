const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const getContent = async (url, totalArr) => {
  let map = {};
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let map = {};
    $('.Detail_arguItem__1CcyM').each((i, elem) => {
      //get Detail_arguLabel__1oQ5h class children text as map's key and Detail_arguValue__3V3S4 class children text as map's value
      // map[$(elem).find('.Detail_arguLabel__1oQ5h').text()] = $(elem)
      //   .find('.Detail_arguValue__3V3S4')
      //   .text();

      let key = $(elem).find('.Detail_arguLabel__1oQ5h').text();
      map[key] = key;
    });

    //save to file
    let urlArr = url.split('/');
    let id = urlArr[urlArr.length - 1];
    let name = $('.Info_product-name__2Z9Dk').text();
    let arr = fs.writeFileSync(
      `./datas/${id}_${name}.json`,
      JSON.stringify(map)
    );
  } catch (error) {
    console.log(error);
  }
};

//test
// let requestURL = 'https://expo.tuya.com/product/337733';
// getContent(requestURL);

module.exports = {
  getContent,
};
