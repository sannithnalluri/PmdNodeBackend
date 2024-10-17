const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource"); // Make sure to adjust the path accordingly
const connectDB = require("../lib/connect");

// Connect to the database
connectDB();

// Create a new resource
router.post("/create", async (req, res) => {
    const { resourcename, resourcekey, projectId } = req.body;

    const newResource = new Resource({
        resourcename,
        resourcekey,
        projectId,
    });

    try {
        await newResource.save();
        return res.status(201).json({ msg: "Resource created successfully", newResource });
    } catch (error) {
        console.error("Error creating resource:", error);
        return res.status(500).json({ msg: "Error creating resource", error: error.message });
    }
});

// Get all resources
router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find();
        return res.status(200).json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        return res.status(500).json({ msg: "Error fetching resources", error: error.message });
    }
});

// Get a resource by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ msg: "Resource not found" });
        }
        return res.status(200).json(resource);
    } catch (error) {
        console.error("Error fetching resource:", error);
        return res.status(500).json({ msg: "Error fetching resource", error: error.message });
    }
});

// Update a resource by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { resourcename, resourcekey } = req.body;

    try {
        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            { resourcename, resourcekey },
            { new: true } // Return the updated document
        );
        if (!updatedResource) {
            return res.status(404).json({ msg: "Resource not found" });
        }
        return res.status(200).json({ msg: "Resource updated successfully", updatedResource });
    } catch (error) {
        console.error("Error updating resource:", error);
        return res.status(500).json({ msg: "Error updating resource", error: error.message });
    }
});

// Delete a resource by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedResource = await Resource.findByIdAndDelete(id);
        if (!deletedResource) {
            return res.status(404).json({ msg: "Resource not found" });
        }
        return res.status(200).json({ msg: "Resource deleted successfully", deletedResource });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return res.status(500).json({ msg: "Error deleting resource", error: error.message });
    }
});

module.exports = router;
