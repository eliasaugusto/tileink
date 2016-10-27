import { EventEmitter } from 'events';
import _ from 'lodash';

class Queue extends EventEmitter {
  /**
   * process() will register a new type of task processor.
   * @param {String} name
   * @param {Function} worker
   */
  process(name, worker) {
    this.on(`start:${name}`, this._onGetProcess.bind(this, name, worker));
  }
  /**
   * create() will start processing a new task.
   * @param {String} name
   * @param {Object} payload
   */
  create(name, payload) {
    this.emit(`start:${name}`, payload);
  }
  /**
   * _onGetProcess() will handle the processing task.
   * @param {String} name
   * @param {Function} worker
   * @param {Object} payload
   */
  _onGetProcess(name, worker, payload) {
    worker(payload).then((result) => {
      this.emit(`complete:${name}`, result);
    }).catch((error) => {
      this.emit(`failed:${name}`, error);
    });
  }
}

/**
 * createQueue() will create an asynchronous queue in memory.
 * @param {Array.<Object>} [tasks] - A list of task processors.
 * @return {Queue}
 */
function createQueue(tasks = []) {
  let queue = new Queue();

  _.forEach(tasks, task => queue.process(task.name, task.worker));

  return queue;
}

export default createQueue;
