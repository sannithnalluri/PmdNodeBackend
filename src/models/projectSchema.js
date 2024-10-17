const mongoose = require('mongoose');
const TeamMember = require('../models/teamMemberSchema'); // Ensure this path is correct

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

// Creating Project model
const Project = mongoose.model('Project', projectSchema);

// Exporting Project model
module.exports = Project;
