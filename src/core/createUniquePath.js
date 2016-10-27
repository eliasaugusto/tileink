import createUUID from './createUUID';

/**
 * createUniquePath() will create a unique file path, based on the generated UUID.
 * @param {String} [pathname] - The root path.
 * @param {Integer} [deph] - The number of subdirectories.
 * @param {Integer} [bytes] - The amount of bytes per directory name.
 * @return {String}
 */
function createUniquePath(pathname = '', deph = 2, bytes = 2) {
  let uuid = createUUID().replace(/\-/g, '');
  let limit = ((deph + 1) * bytes);

  pathname = pathname.replace(/\/$/, '');

  if (limit > uuid.length) {
    throw new Error('The number of bytes per depth exceeds the size of the UUID.');
  }

  for (let i = 0; i < limit; i += bytes) {
    if (i !== bytes) {
      pathname += `\/${uuid.substring(i, bytes)}`;
    }
  }

  return `${pathname}\/${uuid}`;
}

export default createUniquePath;
