#!/usr/bin/env node
import fs  from 'fs' 

import { exit } from 'process';
const file = './temp';
const text = `hahrb
dgsdgdfg
fdggd
g`

const write = () => {

  fs.writeFile(file, text, (err) => console.log(err) );
}



// fs.watch(file, (e, f) => {
//   console.log(`event: ${e}`);

// })

async function example() {
  try {
    const content = 'Some content!';
    await fs.appendFile(file, content);
  } catch (err) {
    console.log(err);
  }
}

const reading = () => {
  fs.readFile(file, 'utf8', (err, data) => {
    if(err) {
      console.error(err);
      return
    }
    console.log(data);
  });
}

reading();