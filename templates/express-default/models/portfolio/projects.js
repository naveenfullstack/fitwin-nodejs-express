const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  project_name: {type: String, required: true},
  project_description: {type: String},
  hours_spent: { type: String},
  started_date: { type: String},
  end_date: {type: String},
  image: {type: String},
});

const Projects = mongoose.model('Project', ProjectSchema);

module.exports = Projects;