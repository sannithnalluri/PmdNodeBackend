const express = require('express');
const app = express();
const cors = require('cors');
const TaskRoute = require('./routes/Tasks');
const ProjectRoute = require('./routes/project');

const TeamMember = require("./routes/TeamMember");
const resourceRouter = require("./routes/resource");
const projectDetails = require("./routes/projectDetails"); 

app.use(express.json());
app.use(cors());


app.get('/api/test',async (req, res) => {
    res.status(200).send("OK API Workings");
});

app.use('/project',ProjectRoute);
app.use('/tasks',TaskRoute);
app.use('/teamMembers', TeamMember); 
app.use('/resources',resourceRouter);
app.use('/projectDetails',projectDetails)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
