const mongoose = require('mongoose');

// Create Mongo schema
const changeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  changeType: { type: String, required: true },
  changeMessage: { type: String, required: true },
  changeVersion: { type: String, required: true },
});

exports.schema = changeSchema;

// Export a mongoose model based on the schema
exports.model = mongoose.model('Change', changeSchema);
