const ConcurrentQueue = require('./concurrent_queue');
const queue = new ConcurrentQueue(10);

queue.once('drain', result => console.log("QUEUE drained", result));
queue.on('task', (task, cb) => setTimeout(() => cb(null, task), 1000));
queue.once('error', err => console.error(err));

const arr = Array.from({length: 100}, (_, i) => i);
for (let i of arr) {
  queue.push(i);
}
queue.run();
