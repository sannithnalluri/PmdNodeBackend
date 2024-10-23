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

// Get all team member names
router.get('/teamMemberNames', async (req, res) => {
    try {
        const members = await teamMembersSchema.find().select("name"); // Exclude _id if you only want names
        return res.json(members); // Send the result as a JSON response
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching team member names" });
    }
});

// Get a team member by ID
router.get("/getby/:id", async (req, res) => {
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

// Update a team member by ID
router.put("/:id", async (req, res) => {
    try {
        const member = await teamMembersSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!member) {
            return res.status(404).json({ message: "Team member not found" });
        }
        return res.status(200).json(member);
    } catch (err) {
        console.error("Error updating team member:", err);
        return res.status(400).json({ message: err.message });
    }
});

// Delete a team member by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete team member with ID: ${id}`);
        
        const member = await teamMembersSchema.findByIdAndDelete(id); // Simplified call
        
        if (!member) {
            return res.status(404).json({ message: "Team member not found" });
        }

        return res.status(200).json({ message: "Team member deleted successfully" }); // Return success message
    } catch (err) {
        console.error("Error deleting team member:", err);
        return res.status(500).json({ message: err.message });
    }
});



// routes/teamMembers.js

// Get team members by project ID
router.get('/byProject/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        // Fetch team members who are assigned to the specified project ID
        const members = await teamMembersSchema.find({ projectId }); // Assuming your schema has a projectId field
        console.log("team members");
        return res.status(200).json(members);
    } catch (err) {
        console.error("Error fetching team members by project ID:", err);
        return res.status(500).json({ message: err.message });
    }
});




router.get('/avaiableTeamMembers',async (req, res) => {
    try {
        const teamMembers = await teamMembersSchema.find({ projectId: null }); 
        return res.status(200).json(teamMembers);
    } catch (error) {
        console.error("Error fetching available team members:", error.message);
        return res.status(500).json({ error: "Failed to retrieve available team members" });
    }

});


router.patch('/assignProject/:memberId', async (req, res) => {
    try {
        console.log("assignProject....!");
        const { memberId } = req.params;
        const { projectId } = req.body; // Expect projectId in the request body

        // Validate that projectId is provided
        if (!projectId) {
            return res.status(400).json({ error: "projectId is required" });
        }

        // Log incoming data for debugging
        console.log("Received memberId:", memberId);
        console.log("Received projectId:", projectId);

        // Update the team member's projectId
        const updatedMember = await teamMembersSchema.findByIdAndUpdate(
            memberId,
            { projectId },
            { new: true } // Return the updated document
        );

        if (!updatedMember) {
            return res.status(404).json({ error: "Team member not found" });
        }

        return res.status(200).json({ message: "Project assigned successfully", updatedMember });
    } catch (error) {
        console.error("Error assigning project:", error.message);
        return res.status(500).json({ error: "Failed to assign project" });
    }
});



router.patch('/removeProject/:memberid', async (req, res) => {
    try {
        const { memberid } = req.params; // Get the member ID from the route parameter
        console.log(`Removing project from member with ID: ${memberid}`);
        
        // Fetch the member by ID
        const member = await teamMembersSchema.findById(memberid);
        if (!member) {
            return res.status(404).json({ message: "Team member not found" });
        }

        // Assuming the member has a 'projectId' field, and you're removing that
        member.projectId = null; // Set the projectId to null or remove it

        // Save the updated member
        await member.save();

        return res.status(200).json({ message: "Project removed from team member" });
    } catch (err) {
        console.error("Error removing project from team member:", err);
        return res.status(500).json({ message: err.message });
    }
});


module.exports = router;
