module.exports = function getDepth(arr) {
  let depth = 0;
  let part = arr;
  while (Array.isArray(part)) {
    depth++;
    part = part[0];
  }
  return depth;
};
