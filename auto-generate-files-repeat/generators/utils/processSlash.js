module.exports = function processSlash(txt) {
  const regx = /^\//;
  if (regx.test(txt)) {
    return txt;
  }
  return '/' + txt;
};
