//Set Node Dependencies
var req = require("./request-handler.js");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var router = express.Router();
app.use(router);

//Initialize messages object
var messages = {results:[]};

//If messages.json is not empty, set messages object to data inside messages.json
var log = fs.readFile('server/messages.json', function(err, data) {
  if (data.length > 0) {
    messages = JSON.parse(data);
  }
});

//Set up node server on port 3000
var server = app.listen(3000, '127.0.0.1', function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening on http://" + host + ":" + port);
});

//On POST request
router.post('/sendmessage', function(req, res, next){
  var data = '';
  //collect data from request
  req.on('data', function(chunk){
    data += chunk;
  });
  //Once the request has ended, parse the data and append it to messages object
  req.on('end', function(){
    req.body = data;
    next();
    var parsed = JSON.parse(req.body);
    messages.results.push(parsed);
    var save = JSON.stringify(messages);
    //overwrite messages.json with updated object
    fs.writeFile('server/messages.json', save);
  });

  // send back success code on response
  res.writeHead(200, req.defaultCorsHeaders);
  res.end('sent');
});

//Send messages object to app on GET
router.get('/getmessages', function(req, res){
  res.send(messages);
});

//serve up app files and scripts
app.get('/', function(req, res) {
  res.sendFile('client/index.html', {'root': './'});
});

app.get('/styles/styles.css', function(req, res) {
  res.sendFile('client/styles/styles.css', {'root': './'});
});

app.get('/images/bg.png', function(req, res) {
  res.sendFile('client/images/bg.png', {'root': './'});
});

app.get('/bower_components/jquery/jquery.min.js', function(req, res) {
  res.sendFile('client/bower_components/jquery/jquery.min.js', {'root': './'});
});

app.get('/bower_components/jquery/jquery.min.map', function(req, res) {
  res.sendFile('client/bower_components/jquery/jquery.min.map', {'root': './'});
});

app.get('/bower_components/underscore/underscore-min.js', function(req, res) {
  res.sendFile('client/bower_components/underscore/underscore-min.js', {'root': './'});
});

app.get('/bower_components/underscore/underscore.js', function(req, res) {
  res.sendFile('client/bower_components/underscore/underscore.js', {'root': './'});
});

app.get('/bower_components/underscore/underscore-min.map', function(req, res) {
  res.sendFile('client/bower_components/underscore/underscore-min.map', {'root': './'});
});

app.get('/env/config.js', function(req, res) {
  res.sendFile('client/env/config.js', {'root': './'});
});

app.get('/scripts/app.js', function(req, res) {
  res.sendFile('client/scripts/app.js', {'root': './'});
});

