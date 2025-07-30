
console.log(process.argv)

// process.env

console.log(process.env.LOGNAME)

console.log(process.pid)

console.log(process.cwd())

console.log(process.title)

console.log(process.memoryUsage())

console.log(process.uptime())

process.on('exit', (code) => {
  console.log(`about to exit with code: ${code}`)
})

process.exit(0);

