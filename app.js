const express = require("express");
const cors = require("cors");
const app = express();
const facultyRouters = require("./routes/v1/faculty.routes");
const userRouter = require("./routes/v1/user.route");
const classroomRouters = require("./routes/v1/classroom.router");
const cookieParser = require("cookie-parser");
const employeeRoutes = require("./routes/v1/employee.routes");
const hostelmemberRouts = require("./routes/v1/hostelmember.route");

// Middleware
app.use(cors(
  {origin: 'http://localhost:3000', 
  credentials: true,}
));
app.use(express.json());
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("Running Presidency App");
});

// Mongodb parteen = Schema -> Model -> Query
app.use('/api/v1/faculty', facultyRouters);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/classroom", classroomRouters);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/hostelmember", hostelmemberRouts);


module.exports = app;
