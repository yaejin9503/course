// @ts-check

// const { resolve } = require('path/posix');
// const { setTokenSourceMapRange } = require('typescript');

// Formatting, Linting ,Type Checking !
// Formatting : Prettier
// Linting: ESLint
// Type Checking: TypeScript

// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.end('Hello!');
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log('The server is listening on 4000');
// });

// var numCounters = 0;

// function getCounter() {
//   numCounters += 1;

//   var result = { count: count, total: 0 };
//   function count() {
//     result.total += 1;
//   }
//   return result;
// }

// var counterA = getCounter();
// counterA.count();
// counterA.count();

// var counterB = getCounter();
// counterB.count();

// console.log(counterA.total, counterB.total, numCounters);

// function Person(name) {
//   this.name = name;
// }

// Person.prototype.greet = function greet() {
//   return `Hi, ${this.name}!`;
// };

// function Student(name) {
//   this.name = name;
// }

// Student.prototype.study = function study() {
//   return `${this.name} i studying!`;
// };

// Object.setPrototypeOf(Student.prototype, Person.prototype);

// const me = new Student('yejin');
// console.log(me.greet());

// const people = [
//   {
//     age: 20,
//     city: '서울',
//     pet: ['cat', 'dog'],
//   },
//   {
//     age: 40,
//     city: '부산',
//   },
//   {
//     age: 31,
//     city: '대구',
//     pet: ['cat', 'dog'],
//   },
//   {
//     age: 36,
//     city: '서울',
//   },
//   {
//     age: 27,
//     city: '부산',
//     pet: 'cat',
//   },
//   {
//     age: 24,
//     city: '서울',
//     pet: 'dog',
//   },
// ];

// function arrayCity() {
//   const array = people.filter(({ age }) => age < 30).map(({ city }) => city);
//   const set = new Set(array);
//   return Array.from(set);
// }
// //console.log(arrayCity());

// /** 각 도시별로 개와 고양이를 키우는 사람의 수 */
// function petCity() {
//   const cities = people.map(({ city }) => city);
//   const noDuplCities = Array.from(new Set(cities));

//   for (let city of noDuplCities) {
//     let obj = {};
//     obj[city] = {};

//     const dogCount = countPet('dog', city);
//     const catCount = countPet('cat', city);

//     if (dogCount > 0) obj[city].dog = dogCount;
//     if (catCount > 0) obj[city].cat = catCount;
//     console.log(obj);
//   }
// }

// function countPet(petName, city) {
//   return people
//     .filter((p) => p.city === city)
//     .filter((item) => item.pet?.includes(petName)).length;
// }
// console.log(petCity());

// new Promise((resolve, reject) => {
//   console.log('Before timeout!');
//   setTimeout(() => {
//     resolve(Math.random());
//     console.log('After resolve');
//   }, 1000);
// }).then((value) => {
//   console.log('value', value);
// });

/** 비동기 코드를 순차적으로 시행 할 수 있게 하는 Promise */

//require('core-js'); // 해당 노드 버전에없는 함수도 사용할 수 있음

// const complicatedArray = [1, [2, 3]];
// console.log(complicatedArray.flat());

// 프레임워크 없이 간단한 RESTful API 서버 만들어보기
/**
 * 블로그 포스팅 서비스
 */

const http = require('http');

const { routes } = require('./api');

const server = http.createServer((req, res) => {
  async function start() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    );

    if (!req.url || !route) {
      res.statusCode = 404;
      res.end('Not found!');
      return;
    }

    const regexResult = route.url.exec(req.url);

    if (!regexResult) {
      res.statusCode = 404;
      res.end('Not found!');
      return;
    }

    const reqBody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8');
          req.on('data', (data) => {
            try {
              resolve(data);
            } catch {
              reject(new Error('Ill-formed json'));
            }
          });
        }))) ||
      undefined;

    const result = await route.callback(regexResult, reqBody);
    res.statusCode = result.statusCode;

    if (typeof result.body === 'string') {
      res.end(result.body);
    } else {
      res.setHeader('Content-type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result.body));
    }
  }
  start();
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`);
});
