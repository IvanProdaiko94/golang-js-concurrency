const fn = function* (n) {
  let j = 1;
  for (let i = j; i <= n; i++) {
    j = yield j;
  }
};

const gen = fn(10);

let done = false;
let tmp = 1;

while (!done) {
  const res = gen.next(tmp);
  done = res.done;
  console.log(tmp);
  tmp = res.value * 2;
}