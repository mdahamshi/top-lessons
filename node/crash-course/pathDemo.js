import path from 'path';
import url  from 'url';
const filePath = './dir1/dir2/test.txt';


// basename
console.log(path.basename(filePath))

console.log(path.dirname(filePath))

console.log(path.extname(filePath))

console.log(path.parse(filePath))

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fielPath2 = path.join(__dirname, 'dir1', 'dir2', 'test.txt');
console.log(fielPath2)

//resolve

const fielPath3 = path.resolve(__dirname, 'dir1', 'dir2', 'test.txt');
console.log(fielPath3)

