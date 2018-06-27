const ConcurrentQueue = require('./concurrent_queue');
const queue = new ConcurrentQueue(10);

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

queue.once('drain', result => console.log("QUEUE drained", result));
queue.on('task', (task, cb) => setTimeout(() => cb(null, task), 1000 * getRandomInt(1, 10)));
queue.once('error', err => console.error(err));

const arr = Array.from({length: 100}, (_, i) => i);
for (let i of arr) {
  queue.push(i);
}
queue.run();
