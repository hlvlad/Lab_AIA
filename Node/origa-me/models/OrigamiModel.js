const mongoose = require('mongoose');
const fs = require('fs');

const origamiModelSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  status: String
}, {optimisticConcurency: true});

// fs.readFile('./init_db.json', 'utf8', (err, jsonString) => {
//     if (err) {
//         console.log("File reading failed:", err);
//         return;
//     }
//     try {
//         let itemList = JSON.parse(jsonString);
//         itemList.forEach(item => {
//             let itemModel = new OrigamiModel(item);
//             itemModel.status = 'available';
//             itemModel.save();
//         });
//     } catch(err) {
//         console.log('Error parsing JSON string:', err);
//     }
// });

module.exports = mongoose.model('OrigamiModel', origamiModelSchema);