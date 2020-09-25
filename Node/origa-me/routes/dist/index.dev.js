"use strict";

var express = require('express');

var mongoose = require('mongoose');

var router = express.Router();
var OrigamiModel = mongoose.model('OrigamiModel');
/* GET home page. */

router.get('/', function (req, res, next) {
  OrigamiModel.find({}, {
    _id: 1,
    name: 1,
    description: 1,
    image: 1,
    status: 1
  }, function (err, items) {
    if (err) {
      console.log("Error retrieving item list:", err);
    } else {
      if (req.session.cart) {
        var cart = req.session.cart;
        var mappedItems = items.map(function (item) {
          if (cart.includes(item.name)) {
            item.status = 'in-cart';
          }
        });
        res.render('index', mappedItems);
      } else {
        res.render('index', items);
      }
    }
  });
});
module.exports = router;