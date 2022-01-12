//@ts-check

const fs = require('fs');
const rs = fs.createReadStream('local/big-file', {
  encoding: 'utf-8',
});

let count = 0;
rs.on('data', (data) => {
  console.log('event', data[0]);
  count += 1;
});

rs.on('end', () => {
  console.log('event: end!');
  console.log('chunkCount', count);
});
