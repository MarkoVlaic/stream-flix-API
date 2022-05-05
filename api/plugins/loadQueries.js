import { readFile } from 'fs/promises';

const loadQueries = async (basePath, paths) => {
  let promises = paths.map(relPath => {
    const path = new URL(relPath, basePath);
    return readFile(path);
  });

  return Promise.all(promises);
};

export default loadQueries;