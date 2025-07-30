import {EventEmitter} from 'events';

const myEmitter = new EventEmitter();

function greetHandler(name) {
  console.log('Hello World', name);
}

function goodbyeHandler(name) {
  console.log('Goodbye World', name);
}

myEmitter.on('greet', greetHandler);
myEmitter.on('goodbye', goodbyeHandler)

myEmitter.emit('greet', 'jhon');
myEmitter.emit('goodbye' ,'sarah');


myEmitter.on('error', (err) => console.log('Erro: ', err))

myEmitter.emit('error', new Error('rerer'))