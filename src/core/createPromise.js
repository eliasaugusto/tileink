/**
 * createPromise() will create a promisse wrapped in a try catch.
 * @param {Function} callback - The promisse body.
 * @param {Object} [context] - The execution context.
 * @return {Promise}
 */
function createPromise(callback, context = null) {
  return new Promise((resolve, reject) => {
    try {
      callback.call(context, resolve, reject);
    } catch (error) {
      reject(error);
    }
  });
}

export default createPromise;
