const express = require("express");
const cors = require("cors");
const app = express();
const facultyRouters = require("./routes/v1/faculty.routes");
const userRouter = require("./routes/v1/user.route");
const classroomRouters = require("./routes/v1/classroom.router");
const employeeRoutes = require("./routes/v1/employee.routes");
const hostelmemberRouts = require("./routes/v1/hostelmember.route");

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

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


module.exports = app;
