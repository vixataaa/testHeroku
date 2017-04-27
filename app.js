var express = require('express');
var low = require('lowdb');
var bodyParser = require('body-parser');

var app = express();
var db = low('data/objects.json');

db._.mixin(require('underscore-db'));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/node_modules'));

var objectsRouter = require('./routers/objectsRouter')(db);
app.use('/objects', objectsRouter);


var port = process.env.port || 3013;

// app.get('', function(req, res) {
//     res.send('It works');
// });

app.listen(port, function() {
    console.log('Server is running on http://127.0.0.1:' + port);
});
