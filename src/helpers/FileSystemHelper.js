import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import mkdirp from 'mkdirp';
import createPromise from '~/core/createPromise';
import createReadable from '~/core/createReadable';

const FileSystemHelper = {
  /**
   * write()
   * @param {String|Readable} data
   * @param {String} pathname
   * @return {Promise}
   */
  write(data, pathname) {
    return createPromise((resolve, reject) => {
      mkdirp(path.dirname(pathname), (error) => {
        if (error) return reject(error);

        let writable = fs.createWriteStream(pathname);
        let readable = _.isString(data) ? createReadable(data) : data;

        readable = readable.pipe(writable.on('error', error => reject(error)));
        readable = readable.on('finish', error => error ? reject(error) : resolve({ pathname }));
        readable = readable.on('error', error => reject(error));
      });
    });
  }
};

export default FileSystemHelper;
