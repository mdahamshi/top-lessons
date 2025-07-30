import fs from 'fs/promises';

// fs.readFile('./test.txt', 'utf8', (err, data) => {
//   if(err) throw err;
//   console.log('async')
//   console.log(data);
// })

// const data = fs.readFileSync('./test.txt', 'utf8');
// console.log(data);
// console.log('sync')

//readfile promise

fs.readFile('./test.txt', 'utf8')
  .then((data) => console.log(data))
  .catch((err) => console.error(err));