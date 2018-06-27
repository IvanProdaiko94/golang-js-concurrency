const { Readable } = require('stream');

class ConcurrentQueue extends Readable {
  constructor(concurrency) {
    super({objectMode: true, highWaterMark: concurrency});
    this.tasks = [];
    this.running = 0;
  }

  add(task) {
    this.tasks.push(task);
  }

  _read() {
    const hwm = this._readableState.highWaterMark;
    const next = (err, result) => {
      this.running -= 1;
      this.push(result);
      if (err !== null) {
        this.emit('error', err);
      }
    };
    const trigger = () => {
      const task = this.tasks.shift();
      this.running += 1;
      this.emit('task', task, next);
    };
    while (this.running < hwm && this.tasks.length > 0) {
      trigger();
    }
  }
}

module.exports = ConcurrentQueue;