const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const OrigamiModel = mongoose.model('OrigamiModel');

/* GET home page. */
router.get('/', (req, res) => {
  const selectedColumns = { _id: 1, name: 1, description: 1, image: 1, status: 1 }
  OrigamiModel.find({}, selectedColumns, (err, items) => {
    if (err) {
      console.log("Error retrieving item list:", err);
    } else {
      const newMessage = req.session.message;
      req.session.message = null;
      if (req.session.cart) {
        const mappedItems = items.map(item => {
          if(item.status === 'available') {
            if (req.session.cart.includes(item._id.toString())) {
              item.status = 'in-cart';
            }
          }
          return item
        });
        res.render('index', {items: mappedItems, message: newMessage});
      } else {
        res.render('index', {items: items, message: newMessage});
      }
    }
  });
});

// Reset app for demo purpose
router.post('/reset', (req, res) => {
  req.session.cart = [];
  OrigamiModel.updateMany({status : { $ne : 'available'}}, {status : 'available'}, (err) => {
    if(err) {
      req.session.message = {type: 'danger', message: `Error reseting app: ${err}`}
    } else {
      req.session.message = {type: 'success', message: 'App has been reseted.'}
    }
  });
  res.redirect('/');
})

module.exports = router;
