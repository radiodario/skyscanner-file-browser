var express = require('express');
var app = express();

app.set('view engine', 'ejs');


app.use(express.static('static'));

var dir = process.argv[2];

if (!dir) {
  console.error('you must provide an absolute path to the directory to browse as an argument');
  process.exit();
}

var fileBrowser = require('./src/fileBrowser')(dir);

var guiRoutes = require('./routes/gui');
app.use('/', guiRoutes(fileBrowser));

var apiRoutes = require('./routes/api');
app.use('/api', apiRoutes(fileBrowser));




// start the server
var server = app.listen(3000, function() {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})