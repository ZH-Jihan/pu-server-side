const express = require("express");
const cors = require("cors");
const app = express();
const facultyRouters = require("./src/routes/v1/faculty.routes.js");
const userRouter = require("./src/routes/v1/user.routes.js");
const classroomRouters = require("./src/routes/v1/classroom.routes.js");
const employeeRoutes = require("./src/routes/v1/employee.routes.js");
const hostelmemberRouts = require("./src/routes/v1/hostelmember.routes.js");
const regStudent = require("./src/routes/v1/regstudents.routes.js");
const convoTeamRouts = require("./src/routes/v1/convoTeam.routes.js");
const stdnaffprogramRouts = require("./src/routes/v1/stdnaffprogram.routes.js");

// Middleware
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get("/", (req, res) => {
  res.send("Running Presidency App");
});

// Mongodb parteen = Schema -> Model -> Query
app.use('/api/v1/faculty', facultyRouters);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/classroom", classroomRouters);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/hostelmember", hostelmemberRouts);
app.use("/api/v1/regstudent", regStudent);
app.use("/api/v1/convocationTeam", convoTeamRouts);
app.use("/api/v1/stdnaffprogram", stdnaffprogramRouts);


module.exports = app;
