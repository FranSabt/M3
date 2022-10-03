const commands = require('./commands/index.js');
const fs = require('fs');

//const cmd = 'pwd';
//Output un prompt


let lastCMD = ''
process.stdout.write('prompt > ');
// El evento stdi 'data' se dispara cuando el user escribe una linea
process.stdin.on('data', (data) =>{
    let cmd = data.toString().trim();
    if(cmd === 'date') commands.date();
    if(cmd === 'pwd') commands.pwd();
    if(cmd === 'ls') commands.ls();
    if(cmd === 'echo') commands.echo(lastCMD);
    if (cmd === 'curl') commands.curl();
    lastCMD = cmd;
})

