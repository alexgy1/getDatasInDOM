## 使用说明

- 输入 ：entry 里面填写包含指定格式的 URLS 的 js 文件
- 执行命令 1 或者 2
- 输出 ： datas/里面对应的 json

## 解释：

`entry` 里面添加 `urls.js` 里面的格式是：

```js
let arr = [
  //add URLS here start
  'https://expo.tuya.com/product/994011',
  'https://expo.tuya.com/product/1019011',
  'https://expo.tuya.com/product/816026',
  'https://expo.tuya.com/product/985005',
  'https://expo.tuya.com/product/897033',
  // add URLS here end
];

module.exports = arr;
```

程序会自动获取对应 URL 里面的 params 区域里面的内容，存到 map 里面。最后可以根据输入的两个不同命令（下面列出的 1 和 2） 来决定输出的文件内容和形式

## scripts

```js
"getSingeMap": "node src/uniqueMapPromiseAjax.js",
"getEachMap": "node src/eachParams.js"
```

- **命令 1** 获取所有输入的 URLS 里面 取并集的一个唯一的 MAP ，根目录下执行 `npm run getSingeMap` 在 datas 里面会得到 test_test.json

- **命令 2** 想获取所有输入的 URLS 里面 对每一个 url 想看一下它的内容，根目录下执行 `npm run getEachMap` 在 datas 里面会得到 对应 ID_name.json
