const fs = require('fs');

const data = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      {
        id: 2,
        name: '部门2',
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: '部门3',
        pid: 1,
        children: [
          {
            id: 4,
            name: '部门4',
            pid: 3,
            children: [
              {
                id: 5,
                name: '部门5',
                pid: 4,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

//@return {Array}
function tree2Data(tree) {
  let res = [];
  let walk = (arr) => {
    if (!arr || arr.length === 0) return;
    for (let item of arr) {
      res.push(item);
      walk(item.children);
      delete item.children;
    }
  };
  walk(tree);
  return res;
}

let res = tree2Data(data);
console.log(res);

// [
//   { id: 1, name: '部门1', pid: 0 },
//   { id: 2, name: '部门2', pid: 1 },
//   { id: 3, name: '部门3', pid: 1 },
//   { id: 4, name: '部门4', pid: 3 },
//   { id: 5, name: '部门5', pid: 4 }
// ]

function tree2DataWithKeys(tree, keysArr = []) {
  let res = [];
  let walk = (arr) => {
    if (!arr || arr.length === 0) return;
    for (let item of arr) {
      let finalObj = {};
      if (keysArr.length > 0) {
        for (let key of keysArr) {
          if (item[key]) {
            finalObj[key] = item[key];
          }
        }
      }
      Object.keys(finalObj).length > 0 ? res.push(finalObj) : res.push(item);

      walk(item.children);
      delete item.children;
    }
  };
  walk(tree);
  return res;
}

//只要返回的数据里面的 指定key 比如id和name ,有这种场景是因为要处理的数据的每一项都有很多属性
// console.log(tree2DataWithKeys(data, ['pid', 'name']));

//测试不传
// console.log(tree2DataWithKeys(data));
// console.log(tree2DataWithKeys(data, []));
// [
//   { id: 1, name: '部门1', pid: 0 },
//   { id: 2, name: '部门2', pid: 1 },
//   { id: 3, name: '部门3', pid: 1 },
//   { id: 4, name: '部门4', pid: 3 },
//   { id: 5, name: '部门5', pid: 4 }
// ]

// //测试传不存在的属性
// console.log(tree2DataWithKeys(data, [['pid1', 'name111']]));

//测试传了一些存在的属性 和一些不存在的属性 todo
// console.log(tree2DataWithKeys(data, ['pid']));

// fs.writeFileSync(`./datas/${id}_${name}.json`, JSON.stringify(map));
const write2File = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data));
};
module.exports = {
  write2File,
  tree2Data,
  tree2DataWithKeys,
};
