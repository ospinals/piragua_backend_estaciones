const test = require("ava");
const getDepth = require("./index");

test("depth of one dimensional array of numbers", (t) => {
  const arr = [0, 1, 2, 3, 4, 5, 78];
  const depth = getDepth(arr);
  t.is(depth, 1);
});

test("depth of two dimensional array of numbers", (t) => {
  const arr = [
    [0, 1],
    [2, 3],
    [4, 5],
    [7, 8],
  ];
  const depth = getDepth(arr);
  t.is(depth, 2);
});

test("depth of three dimensional array of numbers", (t) => {
  const arr = [
    [
      [0, 1],
      [2, 3],
      [4, 5],
      [7, 8],
    ],
    [
      [0, 1],
      [2, 3],
      [4, 5],
      [7, 8],
    ],
  ];
  const depth = getDepth(arr);
  t.is(depth, 3);
});
