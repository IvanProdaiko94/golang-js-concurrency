const { EventEmitter } = require('events');

class ConcurrentQueue extends EventEmitter {
  constructor(concurrency) {
    super();
    this.concurrency = concurrency;
    this.tasks = [];
    this.results = [];
    this.isRunning = false;
  }

  push(task) {
    this.tasks.push(task);
  }

  run() {
    this.isRunning = true;
    let running = 0;

    const next = (err, result) => {
      running -= 1;
      this.results.push(result);
      if (err !== null) {
        this.isRunning = false;
        this.emit('error', err);
        return;
      }
      if (!this.isRunning) {
        return;
      }
      if (this.tasks.length === 0) {
        if (running === 0) {
          this.emit('drain', this.results);
        }
        return;
      }
      if (running < this.concurrency) {
        trigger();
      }
    };

    const trigger = () => {
      const task = this.tasks.shift();
      running += 1;
      console.log({tasks: this.tasks.length, running});
      this.emit('task', task, next);
    };

    while (running < this.concurrency && this.tasks.length > 0) {
      trigger();
    }
  }
}

module.exports = ConcurrentQueue;