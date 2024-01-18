const _ = require('lodash');

const arr = [1, 2, 4, [1, 3, 5, [2, 45, 67]]];
const flatternArr = _.flattenDeep(arr);
console.log(flatternArr);