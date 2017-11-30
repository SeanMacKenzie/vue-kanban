var  models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId
var date = new Date()

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created: { type: String, default: date.toDateString()  },
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  collaborators: [{type: ObjectId, ref: models.user.name}]
});

module.exports = mongoose.model(models.board.name, schema);