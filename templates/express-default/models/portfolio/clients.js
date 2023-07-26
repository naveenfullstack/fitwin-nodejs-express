const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {type: String},
  discription: {type: String},
  button_text: { type: String},
  button_url: { type: String},
  thumnail: {type: String},
  image: {type: String},
});

const Clients = mongoose.model('Clients', ProjectSchema);

module.exports = Clients;