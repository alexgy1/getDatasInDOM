let { tree2DataWithKeys, write2File } = require('./utils/tree2Data');
let obj = require('../datas/category');

let category = obj.props.pageProps.category;
let displatKeys = ['name', 'order', 'path'];
let res = tree2DataWithKeys(category, displatKeys);
console.log(res);

let writePath = `./datas/allCate.json`;
console.log("category's length is : ", res.length);
write2File(writePath, res);
