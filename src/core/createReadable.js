import { Readable } from 'stream';

/**
 * createReadable() will create a readable stream for the provided data.
 * @param {Buffer|Null|String} data - The readable content.
 * @return {Readable}
 */
function createReadable(data) {
  let readable = new Readable();

  readable.push(data, 'utf8');
  readable.push(null);

  return readable;
}

export default createReadable;
