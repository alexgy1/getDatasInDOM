function getDepth(obj) {
  //下面这个判断可能没有必要
  // let canGetDepth = fasle;
  // try {
  //   JSON.parse(obj);
  //   canGetDepth = true;
  // } catch (error) {}

  // if (!canGetDepth) {
  //   return 0;
  // }

  let depth = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
      depth = Math.max(depth, getDepth(obj[key]));
    }
  }
  return depth + 1;
}

let object = {
  name: 'abc',
  key: {
    name2: {
      name: 'dd',
    },
  },
  ybz: {
    xyk: 123,
    tdl: {
      wym: {
        xyw: 234,
      },
      syd: 123,
      syh: [123456.23456, 2345],
    },
    cwj: 123,
  },
};

let obj2 = {
  name: 'abc',
  key: {
    name2: {
      name: 'dd',
    },
  },
  ybz: {
    xyk: 123,
    tdl: {
      wym: {
        xyw: 234,
        ss: {
          name: 1,
          age: {
            test: 2,
          },
        },
      },
      syd: 123,
      syh: [123456.23456, 2345],
    },
    cwj: 123,
  },
};

let obj3 = {};

console.log(getDepth(object)); //4
console.log(getDepth(obj2)); //6
console.log(getDepth(obj3)); //1
