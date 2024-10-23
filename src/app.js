const express = require('express');
const app = express();
const cors = require('cors');
const TaskRoute = require('./routes/Tasks');
const ProjectRoute = require('./routes/project');

const TeamMember = require("./routes/TeamMember");
const resourceRouter = require("./routes/resource");
const projectDetails = require("./routes/projectDetails"); 
const DashboardRoute = require("./routes/Dashboard");
const Authorization = require("./routes/Auth");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Allow methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow headers
  next();
});

app.get('/api/test',async (req, res) => {
    res.status(200).send("OK API Workings");
});

app.use('/project',ProjectRoute);
app.use('/tasks',TaskRoute);
app.use('/teamMembers', TeamMember); 
app.use('/resources',resourceRouter);
app.use('/projectDetails',projectDetails);
app.use('/Dashboard',DashboardRoute);
app.use('/Auth',Authorization);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
