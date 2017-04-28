var express = require('express');
// var low = require('lowdb');
// var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


var db = low('data/objects.json');

db._.mixin(require('underscore-db'));

app.use(bodyParser.json());
// // app.use('/libs', express.static(__dirname + '/node_modules'));

var objectsRouter = require(__dirname + '/routers/objectsRouter')(db);
app.use('/objects', objectsRouter);


// var port = process.env.port || 3013;

// app.get('', function(req, res) {
//     res.send('It works');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
