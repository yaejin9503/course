// @ts-check

//require
const { log } = console;
const fs = require('fs');
// log(require('./module'));
// CommonJS = require
// ECMA module = import export

//callback-style
fs.readFile('./module.js', (err, result) => {
  if (err) log(err);
  else log(result);
});

//error - handling 시 try catch로 에러처리
// sync-style
try {
  const result = fs.readFileSync('./module.js', 'utf-8');
  log('동기적', result);
} catch (e) {
  console.error(e);
}
