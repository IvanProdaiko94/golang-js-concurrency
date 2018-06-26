Promise.all(
  Array.from({length: 10}).map((_, i) => new Promise(res => {
    setTimeout(res, 1000 * i, i)
  }))
).then(data => console.log(data));