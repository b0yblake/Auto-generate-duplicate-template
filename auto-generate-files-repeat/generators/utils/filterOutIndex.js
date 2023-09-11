const REGEX_INDEX = /index\.(js|ts|tsx)$/;

module.exports = function(filesArray) {
  const results = filesArray.filter(item => !REGEX_INDEX.test(item));
  return results;
}