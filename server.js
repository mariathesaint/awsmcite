// берём Express
var express = require('express');
var $ = require('jquery');
var myParser = require("body-parser");
var fs = require('fs');
var fileName;

var regex = new RegExp(',', 'g');

// создаём Express-приложение
var app = express();

var beg="\"";
// создаём маршрут для главной страницы
// http://localhost:8080/


app.get('/', function(req, res) {
  res.sendfile('index.html');
  console.log("im here");
});
app.get('/files.html', function(req, res) {
  res.sendfile('files.html');
});
app.get('/backend.js', function(req, res) {
  res.sendfile('backend.js');
});
app.get('/jquery.js', function(req, res) {
  res.sendfile('jquery.js');
});
app.use(myParser.urlencoded({extended : true}));
app.post('/server', function(req, res) {
	output="";
  console.log("WE HAVE A POST");
  console.log(req.body); 

output = beg + JSON.stringify(req.body).slice(4,-7).replace(regex,"\",\"")+"\"\n";
//fs.appendFileSync('jslog.csv', output);
var logStream = fs.createWriteStream('jslog.csv', {'flags': 'a+'});
// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
logStream.write(output);
logStream.end();
//This prints the JSON document received (if it is a JSON document)
});

// запускаем сервер на порту 8080
app.listen(8080);
// отправляем сообщение
console.log('Сервер стартовал!');

