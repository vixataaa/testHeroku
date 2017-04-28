var express = require('express');

// TODO: fix formatting

module.exports = function (db) {
    var router = express.Router();

    // Get all hotels
    router.get('/', function (req, res) {
        // Get all hotels sorted alphabetically
        const resultHotels = db.get('hotels')
            .chain()
            .sortBy('name')
            .value();

        res.json(resultHotels);

    });

    // Get hotels by page
    router.get('/:pageNumber', function (req, res) {
        const pageSize = 5 || req.pageSize;
        const pageNumber = req.params.pageNumber;
        const hotelsDB = db.get('hotels');

        if (pageSize * pageNumber - pageSize > hotelsDB.size()) {
            res.status(400)
                .json("No hotels on this page");
            return;
        }

        // Sort hotels by name and get by indices based on page selected
        const resultHotels = hotelsDB.chain()
            .sortBy('name')
            .slice(pageNumber * pageSize - pageSize, pageNumber * pageSize)
            .value();

        res.json(resultHotels);
    });

    // Add new hotel
    router.post('/', function (req, res) {
        const hotelToAdd = req.body;

        const duplicatingHotel = db.get('hotels')
            .find({name: hotelToAdd.name});

        if (duplicatingHotel.value()) {
            res.status(400)
                .json("Hotel with such name already exists");
            return;
        }

        db.get('hotels')
            .insert(hotelToAdd)
            .write();
    });

    // Get specific hotel
    router.put('/', function(req, res) {
        // Add logic for additional params (price, etc)
        const searchedHotelName = req.body.name;

        const foundHotel = db.get('hotels')
            .find({name: searchedHotelName})
            .value();

        if(!foundHotel) {
            res.status(400)
                .json("Hotel with such parameters(name) doesnt exist");
                return;
        }

        res.json(foundHotel);
    });

    // Edit hotel properties
    router.patch('/', function(req, res) {
        const searchedHotel = req.body;
        console.log(req.body);

        const foundHotel = db.get('hotels')
            .find({name: searchedHotel.name});

        if(!foundHotel.value()) {
            res.status(400)
                .json("No hotel with that name found");
            return;
        }

        foundHotel.assign(searchedHotel).write();
        res.json("Edited.");
    });

    return router;
};