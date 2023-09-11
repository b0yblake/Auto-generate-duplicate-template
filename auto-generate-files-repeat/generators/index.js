const mainGenerator = require('./forMain');
const actionConsole = require('./utils/actionConsole');
const { METHOD } = require('./constants');

module.exports = plop => {
  plop.setGenerator('Create a new main container ?', mainGenerator);
  plop.setActionType('console', actionConsole);
  plop.setHelper('keyOfMethod', function (methodValue) {
    for (let key in METHOD) {
      if (METHOD[key] === methodValue) {
        return key;
      }
    }
  });
};
