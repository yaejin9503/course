// @ts-nocheck

//require
const { log } = console;
const fs = require('fs');
// log(require('./module'));
// CommonJS = require
// ECMA module = import export

//callback-style
// fs.readFile('./module.js', (err, result) => {
//   if (err) log(err);
//   else log(result);
// });

//error - handling 시 try catch로 에러처리
// sync
// try {
//   const result = fs.readFileSync('./module.js', 'utf-8');
//   log('동기적', result);
// } catch (e) {
//   console.error(e);
// }

/**
 * aaaaaaaabbbbbbbbbaaaaaaaabbbbbbbbbaaaaaaaabbbbbbbbbaaaaaaaabbbbbbbbb...aaaaaaaabbbbbbbbb
 * 위와 같은 파일에서, a의 연속 구간(a chunk)의 개수와, b의 연속 구간(b chunk)의 개수를 세는 프로그램
 */

const rs = fs.createReadStream('local/jsons', {
  encoding: 'utf-8',
});

let totalSum = 0;

rs.on('data', (chunk) => {
  console.log('Event: data', chunk);

  if (typeof chunk !== 'string') {
    return;
  }

  totalSum += chunk
    .split('\n')
    .map((jsonLine) => {
      try {
        returnJSON.parse(jsonLine);
      } catch {
        return undefined;
      }
    })
    .filter((json) => json)
    .map((json) => json.data)
    .reduce((sum, curr) => sum + curr, 0);
});

rs.on('end', () => {
  console.log('Event: end');
  console.log('totalSum', totalSum);
});
