var c = {a:4, b:6};
console.log(c);
console.log(JSON.stringify(c));

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)

//Add line 14

//Add line 16