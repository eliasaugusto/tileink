/**
 * createUUID() will generate an UUID but with low-quality RNG.
 * Thanks to: https://stackoverflow.com/a/2117523/224810
 * @return {String}
 */
function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    let random = (Math.random() * 16 | 0);
    let value = ((character === 'x') ? random : (random & 0x3 | 0x8));

    return value.toString(16);
  });
}

export default createUUID;
