var express = require('express');

module.exports = function (db) {
    var router = express.Router();

    // router.get('/', function(req, res) {
    //     res.send(db);
    // });

    router.get('/hotels/:id', function(req, res) {
        res.send(db.get('hotels').find({ name : `Hotel ${req.params.id}`}))
    });

    return router;
};