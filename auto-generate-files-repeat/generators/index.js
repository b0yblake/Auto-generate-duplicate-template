const adminGenerator = require('./forAdmin');
const frontendGenerator = require('./forFrontend');
const actionConsole = require('./utils/actionConsole');
const { METHOD } = require('./constants');

module.exports = plop => {
  plop.setGenerator('Create a new admin container ?', adminGenerator);
  // plop.setGenerator('Create a new frontend container ?', frontendGenerator);
  plop.setActionType('console', actionConsole);
  plop.setHelper('keyOfMethod', function (methodValue) {
    for (let key in METHOD) {
      if (METHOD[key] === methodValue) {
        return key;
      }
    }
  });
};
