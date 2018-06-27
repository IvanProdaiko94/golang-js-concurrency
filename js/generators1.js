const fn = function* (n) {
  for (let i = 0; i < n; i++) {
    yield i ** 2;
  }
};

const gen = fn(10);
for (const i of gen) {
  console.log(i)
}