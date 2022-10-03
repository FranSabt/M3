const fs = require("fs");
const request = require("request");

const done = function(output) {
  // muestra el output
  process.stdout.write(output)
  // muestra el prompt
  process.stdout.write('\nprompt > ')

  }

module.exports = {
  pwd: () => {
    done(Date());
  },
  date: () => {
    done(process.cwd());
  },
  ls: () => {
    fs.readdir(".", function (err, files) {
      if (err) throw err;
      files.forEach(function (file) {
        done(file.toString() + "\n");
      });
    });
  },
  echo: (data) => {
    done(data);
  },
  curl: () => {
    request('https://jsonplaceholder.typicode.com/todos/1', (error, response, body) => {
      // Printing the error if occurred
      if (error) console.log(error);
      // Printing status code
      console.log(response.statusCode);
      // Printing body
      done(body);
    });
  },
};
