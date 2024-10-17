const mongoose = require("mongoose");

// Define the Resource schema
const ResourceSchema = new mongoose.Schema({
    resourcename: { type: String, required: true }, // Changed 'String' to String
    resourcekey: { type: String, required: true }, // Made required
    projectId: { type: String, required: true }, // Made required
});

// Create and export the Resource model
const Resource = mongoose.model("Resource", ResourceSchema); // Use model, not models
module.exports = Resource;
