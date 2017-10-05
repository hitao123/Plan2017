var fs = require('fs');
var path = require('path');
var http = require('http');
var express = require('express');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// 使用中间件
app.use(favicon());
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// cookie parser
app.use(cookieParser());
// 静态文件
app.use(express.static(path.resolve(__dirname, 'static')));


app.get('/', function (req, res) {
  res.send('Hello World!')
});

const PORT = process.env.PORT || 20000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}!`);
});



module.exports = app;
