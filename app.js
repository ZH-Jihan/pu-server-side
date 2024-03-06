const express = require("express");
const cors = require("cors");
const app = express();
const facultyRouters = require("./routes/v1/faculty.routes");
const userRouter = require("./routes/v1/user.route");
const classroomRouters = require("./routes/v1/classroom.router");
const employeeRoutes = require("./routes/v1/employee.routes");
const hostelmemberRouts = require("./routes/v1/hostelmember.route");
const regStudent = require("./routes/v1/regstudents.routes");

// Middleware
app.use(express.json());
app.use(cors(
  {withCredentials:true}
))

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


module.exports = app;
