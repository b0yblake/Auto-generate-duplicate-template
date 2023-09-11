const {
  adminSrcPath,
  containerFolder,
  serviceFolder,
} = require('./constants');
const { METHOD } = require('../constants');
const REGEX = require('./regex');
const processSlash = require('../utils/processSlash');

const rootExeDir = `${process.env.PWD}/`;
// const storeFiles = filterOutIndex(fs.readdirSync(adminSrcPath + storeFolderName));
// const actionFiles = filterOutIndex(fs.readdirSync(adminSrcPath + actionFolderName));

module.exports = {
  description: 'application controller logic',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the container ? E.g: DashBoard, Admin...',
    },
    {
      type: 'confirm',
      name: 'isProtectedRoute',
      message: 'Is it a ProtectedRoute ?',
    },
    {
      type: 'input',
      name: 'routePath',
      message: 'Please input the pathname of the new page. E.g: /dashboard/123',
    },
    {
      type: 'confirm',
      name: 'hasRequest',
      message: 'Do you want to add some API request now ?',
    },
    {
      type: 'input',
      name: 'requestName',
      when: (data) => !!data.hasRequest,
      message: 'What is the name of the request ?',
    },
    {
      type: 'list',
      name: 'requestMethod',
      when: (data) => !!data.hasRequest,
      choices: [...Object.values(METHOD)],
      message: 'What is the method of the request ?',
    },
    {
      type: 'input',
      name: 'apiPath',
      when: (data) => !!data.hasRequest,
      message: 'Please input the API pathname. . E.g: /post/123',
    },
  ],
  actions(data) {
    const actions = [{
      type: 'console',
    }];
    if (data.name) {
      // Add the container's index file
      actions.push({
        type: 'add',
        path: `${rootExeDir + adminSrcPath + containerFolder}{{ properCase name }}/index.ts`,
        templateFile: `${rootExeDir}generators/templates/index.ts.hbs`,
        abortOnFail: true,
      });
      // Add the container's main file
      actions.push({
        type: 'add',
        path: `${rootExeDir + adminSrcPath + containerFolder}{{ properCase name }}/{{ properCase name}}.tsx`,
        templateFile: `${rootExeDir}generators/templates/container.tsx.hbs`,
        abortOnFail: true,
      });
      // Add the styles for the container
      actions.push({
        type: 'add',
        path: `${rootExeDir + adminSrcPath + containerFolder}{{ properCase name }}/styles.ts`,
        templateFile: `${rootExeDir}generators/templates/styles.ts.hbs`,
        abortOnFail: true,
      });
      // Add the container's reducer
      actions.push({
        type: 'add',
        path: `${rootExeDir + adminSrcPath + containerFolder}{{ properCase name }}/reducer.ts`,
        templateFile: `${rootExeDir}generators/templates/reducer.ts.hbs`,
        abortOnFail: true,
      });
      // Add the container's reducer
      actions.push({
        type: 'add',
        path: `${rootExeDir + adminSrcPath + containerFolder}{{ properCase name }}/Loadable.tsx`,
        templateFile: `${rootExeDir}generators/templates/Loadable.tsx.hbs`,
        abortOnFail: true,
      });
      // Import the reducer to the rootReducer
      actions.push({
        type: 'append',
        path: `${rootExeDir + adminSrcPath}redux/reducer/index.ts`,
        pattern: REGEX.IMPORT_PLOT,
        template: 'import {{camelCase name}}Store from \'../../containers/{{properCase name}}/reducer\';',
        abortOnFail: true,
      });
      // Register the reducer to the rootReducer
      actions.push({
        type: 'append',
        path: `${rootExeDir + adminSrcPath}redux/reducer/index.ts`,
        pattern: REGEX.REDUCER_PLOT,
        template: '  {{camelCase name}}Store,',
        abortOnFail: true,
      });
      // Register the Route to the BrowserRouter
      actions.push({
        type: 'append',
        path: `${rootExeDir + adminSrcPath}App.tsx`,
        pattern: REGEX.ROUTE_PLOT,
        templateFile: `${rootExeDir}generators/templates/routeTag.tsx.hbs`,
        abortOnFail: true,
      });
      // Register the url path to the path declaration file
      actions.push({
        type: 'append',
        path: `${rootExeDir + adminSrcPath}constants/clientPath.ts`,
        pattern: REGEX.NEW_PATH_PLOT,
        template: `  {{upperCase name}}: '${processSlash(data.routePath)}',`,
        abortOnFail: true,
      });
      // Import the container to the App file
      actions.push({
        type: 'append',
        path: `${rootExeDir + adminSrcPath}App.tsx`,
        pattern: REGEX.IMPORT_PLOT,
        template: 'import {{properCase name}}Page from \'./containers/{{properCase name}}/Loadable\';',
        unique: true,
        abortOnFail: true,
      });
      // Create the saga
      actions.push({
        type: 'add',
        path: `${rootExeDir + adminSrcPath + containerFolder}{{ properCase name }}/saga.ts`,
        templateFile: `${rootExeDir}generators/templates/saga.ts.hbs`,
        abortOnFail: true,
      });
      // Create the service
      actions.push({
        type: 'add',
        path: `${rootExeDir + adminSrcPath + serviceFolder}{{ properCase name }}Service.ts`,
        templateFile: `${rootExeDir}generators/templates/service.ts.hbs`,
        abortOnFail: true,
      });
      // Import the saga to the rootSaga file
      actions.push({
        type: 'append',
        path: `${rootExeDir + adminSrcPath}redux/saga/index.ts`,
        pattern: REGEX.IMPORT_PLOT,
        template: 'import {{ properCase name }}Saga from \'../../containers/{{ properCase name }}/saga\';',
        abortOnFail: true,
      });
      // Register the saga to the rootSaga file
      actions.push({
        type: 'append',
        path: `${rootExeDir + adminSrcPath}redux/saga/index.ts`,
        pattern: REGEX.NEW_SAGA_PLOT,
        template: '    {{ properCase name }}Saga(),',
        abortOnFail: true,
      });
    }
    return actions;
  },
};
