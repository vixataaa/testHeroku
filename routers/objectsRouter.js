var express = require('express');

module.exports = function (db) {
    var router = express.Router();

    router.get('/', function(req, res) {
        res.send(db);
    });

    return router;
};