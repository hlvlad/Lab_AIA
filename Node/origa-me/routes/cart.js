const express = require('express');
const router = express.Router();
const OrigamiModel = require('../models/OrigamiModel');

/* GET cart listing. */
router.get('/', (req, res) => {
  OrigamiModel.find({_id : { $in : req.session.cart }}, "_id name description", (err, items) => {
    const message = req.session.message;
    res.render('cart', {cart: items, message: message});
  });
});

router.post('/', (req, res) => {
  if(!req.session.cart || !Array.isArray(req.session.cart)) {
    req.session.cart = [];
  }
  req.session.cart.push(req.body.id);
  req.session.cart = [...new Set(req.session.cart)];
  req.session.message = {type: 'success', message: 'Item has been added to cart'};
  res.redirect('/');
});

router.post('/checkout', (req, res) => {
  const cart = req.session.cart;
  if(cart && cart.length) {
    OrigamiModel.find({_id: {
      $in: cart
    }}, "_id status __v", (err, items) => {
    const isValid = items.every(item => item.status === 'available');
    if(isValid) {
      try {
        items.forEach(item => {
          item.status = 'not-available';
          item.save();
        });
        req.session.message = {type: 'success', message: 'Order has been completed successfully'}
        req.session.cart = [];
        res.redirect('/');
      } catch(e) {
        req.session.message = {type: 'danger', message: 'Could not complete order. Some items have been ordered by another user.'}
        res.redirect('/cart');
      }
    } else {
        req.session.message = {type: 'danger', message: 'Could not complete order. Some items have been ordered by another user.'}
        res.redirect('/cart');
    }
    });
  }
});

router.delete('/:id', (req, res) => {
  if(req.session.cart) {
    const index = req.session.cart.indexOf(req.params.id);
    if(index > -1) {
      req.session.cart.splice(index, 1);
    }
  }
  res.render('cart', {message: {type: 'warning', message: 'Item has been removed to cart.'}});
});

router.delete('/', (req, res) => {
  req.session.cart = [];
  req.session.message = {type: 'warning', message: 'Shoping cart has been cleared.'};
  res.redirect('/');
});

module.exports = router;
