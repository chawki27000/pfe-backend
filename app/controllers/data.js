var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var Child = require('../models/child');

// define default router
module.exports = function (app) {
  app.use('/data/', router);
};

// route to insert a drug element in DB
router.get('/insert', function (req,res) {
    var drug = new Child({
        user: "58a873fd64bdd75525498308",
        age: {
            num: 18,
            types: "year"
        },
        lastName: 'bar',
        school_mother: "3 AS",
        school_father: "licence",
        address_parent: "avenue 1, rue inconnue",
    });

    drug.save(function (err, drug) {
        if (err) return res.send(err);

    });

    res.end();
})
