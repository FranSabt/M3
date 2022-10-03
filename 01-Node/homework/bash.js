// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//   var cmd = data.toString().trim(); // remueve la nueva línea
//   process.stdout.write('You typed: ' + cmd);
//   process.stdout.write('\nprompt > ');
// });

process.stdout.write('prompt your name > ');

process.stdin.on('name', function(name){
    var cmd = name.toString().trim();
    process.stdout.write(`Hello ${cmd}`);
    process.stdout.write('\nprompt your name > ');
})