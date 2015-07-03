console.log('started');
console.log(process.cwd())
console.log(require.resolve('./2iwillfork'));


import iwillfork = require('./2iwillfork');
iwillfork.fork();

