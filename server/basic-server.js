//Set Node Dependencies
var req = require("./request-handler.js");
var fs = require("fs");
var express = require("express");
//var bodyParser = require("body-parser");
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
router.post('/sendmessage', function(request, response){
  var data = '';
  //collect data from request
  request.on('data', function(chunk){
    data += chunk;
  });
  //Once the request has ended, parse the data and append it to messages object
  request.on('end', function(){
    request.body = data;
    var parsed = JSON.parse(request.body);
    messages.results.push(parsed);
    var save = JSON.stringify(messages);
    //overwrite messages.json with updated object
    fs.writeFile('server/messages.json', save);
  });
  // send back success code on response
  response.writeHead(200, req.defaultCorsHeaders);
  response.end('sent');
});

var objInArray = function(array, obj){
  if (obj !== undefined && obj !== null){
    for (var i = 0; i < array.length; i++){
      if (obj.username === array[i].username && obj.text === array[i].text){
        return true;
      }
    }
  }
  return false;
};

router.post('/classes/messages', function(request, response){
  var headers = req.defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

  var data = '';
  //collect data from request
  request.on('data', function(chunk){
    data += chunk;
  });
  //Once the request has ended, parse the data and append it to messages object
  var parsed;
  request.on('end', function(){
    request.body = data;
    parsed = JSON.parse(request.body);
    console.log(parsed);
    //overwrite messages.json with updated object
    if (!objInArray(messages.results, parsed)){
      messages.results.push(parsed);
      var save = JSON.stringify(messages);
      fs.writeFile('server/messages.json', save);
      response.set(headers).status(201).send('received');
    } else {
      response.set(headers).status(200).send(JSON.stringify(parsed));
    }
  });
  // send back success code on response
});

router.post('/classes/room1', function(request, response){
  var headers = req.defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

  var data = '';
  //collect data from request
  request.on('data', function(chunk){
    data += chunk;
  });
  //Once the request has ended, parse the data and append it to messages object
  var parsed;
  request.on('end', function(){
    request.body = data;
    parsed = JSON.parse(request.body);
    console.log(parsed);
    //overwrite messages.json with updated object
    if (!objInArray(messages.results, parsed)){
      messages.results.push(parsed);
      var save = JSON.stringify(messages);
      fs.writeFile('server/messages.json', save);
      response.set(headers).status(201).send('received');
    } else {
      response.set(headers).status(200).send(JSON.stringify(parsed));
    }
  });
  // send back success code on response
});

router.get('/classes/room1', function(request, response){
  var headers = req.defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  response.set(headers).status(200).send(JSON.stringify(messages));
});

//Send messages object to app on GET
router.get('/getmessages', function(req, res){
  res.send(messages);
});

router.get('/classes/messages', function(request, response){
  var headers = req.defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  response.set(headers).status(200).send(messages);
  // response.writeHead(200, headers);
  // response.end();
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

app.get('/scripts/app.js', function(req, res) {
  res.sendFile('client/scripts/app.js', {'root': './'});
});

