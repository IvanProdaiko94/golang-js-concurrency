const parallel = (f, n, cb) => {
  const result = [];
  for (let j = 0; j < n; j++) {
    fn(j, k => {
      result.push(k);
      if (j === n - 1) {
        cb(result);
      }
    });
  } 
};

const fn = (n, cb) => setTimeout(() => cb(n + 1), 1000);
parallel(fn, 10, result => console.log(result));