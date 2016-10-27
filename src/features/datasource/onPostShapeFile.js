import path from 'path';
import _ from 'lodash';
import boom from 'boom';
import createUniquePath from '~/core/createUniquePath';
import FileSystemHelper from '~/helpers/FileSystemHelper';
import settings from '~/settings';

/**
 * onPostShapeFile()
 * @param {Object} request
 * @param {Function} reply
 */
function onPostShapeFile({ payload }, reply) {
  let storage = _.get(settings, 'paths.storage');
  let filename = _.snakeCase(payload.name);
  let pathuuid = createUniquePath();
  let pathname = path.join(storage, pathuuid, `${filename}.zip`);
  let file = FileSystemHelper.write(payload.file, pathname);

  file.then((result) => {
    reply(result);
  }).catch((error) => {
    reply(boom.badRequest(error));
  });
}

export default onPostShapeFile;
