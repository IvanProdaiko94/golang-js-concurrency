const ConcurrentQueue = require('./concurrent_queue');
const queue = new ConcurrentQueue(10);
const { Writable } = require("stream");

const arr = Array.from({length: 100}, (_, i) => i);
for (let i of arr) {
  queue.add(i);
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

queue
  .on('task', (task, cb) => setTimeout(() => cb(null, task), 1000 * getRandomInt(1, 5)))
  .once('error', err => console.error(err))
  .pipe(new Writable({
    objectMode: true,
    write(data, encoding, done) {
      console.log("write", data);
      done();
    }
  }));