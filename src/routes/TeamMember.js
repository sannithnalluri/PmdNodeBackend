const express = require("express");
const router = express.Router();
const teamMembersSchema = require("../models/teamMemberSchema.js");
const connectDB = require("../lib/connect");

// Connect to the database
router.use(async (req, res, next) => {
    try {
        await connectDB();
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error("Database connection error:", err);
        return res.status(500).json({ message: "Database connection error" });
    }
});

// Create a new team member
router.post("/", async (req, res) => {
    try {
        const newMember = new teamMembersSchema(req.body);
        await newMember.save();
        return res.status(201).json(newMember);
    } catch (err) {
        console.error("Error creating team member:", err);
        return res.status(400).json({ message: err.message });
    }
});

// Get all team members
router.get("/", async (req, res) => {
    try {
        const members = await teamMembersSchema.find();
        return res.status(200).json(members);
    } catch (err) {
        console.error("Error fetching team members:", err);
        return res.status(500).json({ message: err.message });
    }
});

router.get('/teamMemberNames', async (req, res) => {
    try {
        const members = await teamMembersSchema.find().select("name"); // Exclude _id if you only want names
        return res.json(members); // Send the result as a JSON response
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching team member names" });
    }
});

// Get a team member by ID
router.get("getby/:id", async (req, res) => {
    try {
        const member = await teamMembersSchema.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: "Team member not found" });
        }
        return res.status(200).json(member);
    } catch (err) {
        console.error("Error fetching team member:", err);
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
