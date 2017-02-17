var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var Drug = require('../models/drug');

// define default router
module.exports = function (app) {
  app.use('/data/', router);
};

// route to insert a drug element in DB
router.get('/insert', function (req,res) {
    var drug = new Drug({
        category: 'Psychotrope',
        name: 'valium',
        format: 'pilule',
        masse: 100
    });

    drug.save(function (err, drug) {
        if (err) return res.send(err);

    });

    res.end();
})
