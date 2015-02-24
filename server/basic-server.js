/* Import node's http module: */
var req = require("./request-handler.js");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var http = require("http").Server(app);
var router = express.Router();
app.use(router);



// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var server = app.listen(3000, '127.0.0.1', function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening on http://" + host + ":" + port);
});

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
app.get('/', function(req, res) {
  res.sendFile('client/index.html', {'root': './'});
});

router.post('/sendmessage', function(req, res){
  console.log('hi');
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


// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

