'use strict';

const { each } = require('bluebird');
var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // promise version
  // ???
  
  Promise.all([promisifiedReadFile('poem-two/stanza-01.txt'), promisifiedReadFile('poem-two/stanza-02.txt')])
    .then(res => res.map( e => blue(e)))
    .finally(() => console.log('done'))
}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  // var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
  //   return 'poem-two/' + 'stanza-0' + n + '.txt';
  // });

  // // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );

  // promise version
  // ???
  var filenames = [1, 2, 3, 4, 5, 6, 7, 8];
  Promise.all(filenames.map((n) => promisifiedReadFile('poem-two/' + 'stanza-0' + n + '.txt')))
  .then(res => res.map(e => blue(e)))
  .finally(() => console.log('done'))
}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignor?? errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  // var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
  //   return 'poem-two/' + 'stanza-0' + n + '.txt';
  // });

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );

  // promise version
  // ???
  var filenames = [1, 2, 3, 4, 5, 6, 7, 8];
  Promise.all(filenames.map((n) => promisifiedReadFile('poem-two/' + 'stanza-0' + n + '.txt')))
  .then(res => res.map(e => blue(e)))
  .finally(() => console.log('done')) //  no se si era asi????


  const SOLUCION_DEL_PROFE = '';
  var promesas = filenames.map(file => promisifiedReadFile(file));
  Promise.all(promesas)
  .then(stanzas => {
    stanzas.forEach(st => blue(st))// => ESTO FUE LO QUE FALT??
    console.log('done');
  })

}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  // var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
  //   return 'poem-two/' + 'stanza-0' + n + '.txt';
  // });
  // var randIdx = Math.floor(Math.random() * filenames.length);
  // filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log('-- D. callback version done --');
  //   }
  // );

  // promise version
  // ???
  var filenames = [1, 2, 3, 4, 5, 6, 7, 8];
  Promise.all(filenames.map((n) => promisifiedReadFile('poem-two/' + 'stanza-0' + n + '.txt')))
  .then(res => res.map(e => blue(e)))
  .catch(err => magenta(new Error(err)))
  .finally(() => console.log('done')) 

}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versi??n promisificada de fs.writeFile
   *
   */

  utils.promisifiedReadFile = function (filename) {
    return new Promise(function (resolve, reject) {
      utils.readFile(filename, function (err, str) {
        if (err) reject(err);
        else resolve(str);
      });
    });
  };

  var fs = require('fs');
  
  function promisifiedWriteFile (filename, str) {
    // tu c??digo aqu??
    return new Promise(function(resolve, reject){
      fs.writeFile(filename, str, (err,str) => {
        if (err) reject(err);
        else resolve(str)
      })
    })

    SOLUCION_DEL_PROFE;
  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // tu c??digo aqu??
    return new Promise(function(resolve, reject){
      fs.writeFile(filename, data, 'utf-8', err => { //===> Falt?? 'utf-8'!!!!!!!!!!!!!!!!!!!!!!
        if(err) reject(err);
        resolve('Me resolv?? exitosamente', str)
      })
    })
  }
  }
  promisifiedWriteFile('./lorem.txt', 'lorem ipsum dolor sit ame')
}
