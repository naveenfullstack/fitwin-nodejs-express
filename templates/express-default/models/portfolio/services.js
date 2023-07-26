const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  titile: {type: String},
  discription: {type: String},
  icon: { type: String},
  image: { type: String},
  button_text: {type: String},
});

const Services = mongoose.model('Services', ProjectSchema);

module.exports = Services;