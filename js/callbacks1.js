const fn = (n, cb) => setTimeout(() => cb(n + 1), 1000);
let j = 0;
const cb = n => {
  if (n <= 10) {
    j = n;
    console.log(n);
    fn(j, cb)
  }
};
fn(j, cb);