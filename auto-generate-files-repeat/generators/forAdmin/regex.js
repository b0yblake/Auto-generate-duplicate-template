module.exports = {
  // In each reducer file
  ACTION_PLOT: /\},(?=\n\}\))/g,
  // In each reducer file
  REDUCER_PLOT: /,(?=\n\}\))/g,
  // In any file
  IMPORT_PLOT: /import.*?;(?=\n{2})/g,
  // In the src/App.tsx file
  ROUTE_PLOT: /\/>(?=\n\s*?<\/Switch)/g,
  // In the src/constants/
  NEW_PATH_PLOT: /(?<=:.*),(?=\n\})/g,
  // In the request index
  NEW_REQUEST_PLOT: /(?<=export(.*\n)*?)\}/g,
  // In the rootSaga file
  NEW_SAGA_PLOT: /\(\),(?=\n\s+\]\);)/g,
};
