const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { get } = require("express/lib/response");
const upload = multer({ dest: "uploads/" });
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongo DB conect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8jfgeef.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Verify JWT Token
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    await client.connect();
    const facultyCollection = client.db("PU-App").collection("faculty");
    const departmentCollection = client.db("PU-App").collection("department");
    const semesterCollection = client.db("PU-App").collection("semester");
    const programCollection = client.db("PU-App").collection("program");
    const courseCollection = client.db("PU-App").collection("course");
    const classroomCollection = client.db("PU-App").collection("classroom");
    const routinCollection = client.db("PU-App").collection("routin");
    const districtCollection = client.db("PU-App").collection("district");
    const upazilaCollection = client.db("PU-App").collection("upazila");
    const universityCollection = client.db("PU-App").collection("university");
    const facultyabsentCollection = client
      .db("PU-App")
      .collection("facultyabsent");
    const orderCollection = client.db("PU-App").collection("order");
    const userCollection = client.db("PU-App").collection("user");
    const reviewCollection = client.db("PU-App").collection("review");
    const profileCollection = client.db("PU-App").collection("profile");

    // Varify Admin
    const verifyAdmin = async (req, ser, next) => {
      const requester = req.decoded.email;
      const requesterAccount = await userCollection.findOne({
        email: requester,
      });
      if (requesterAccount.role === "admin") {
        next();
      } else res.status(403).send({ message: "forbidden" });
    };
    // Get All Product

    app.get("/faculty", async (req, res) => {
      const query = {};
      const cursor = facultyCollection.find(query);
      const faculty = await cursor.toArray();
      res.send(faculty);
    });
    app.get("/department", async (req, res) => {
      const query = {};
      const cursor = departmentCollection.find(query);
      const department = await cursor.toArray();
      res.send(department);
    });
    app.get("/semester", async (req, res) => {
      const query = {};
      const cursor = semesterCollection.find(query);
      const semester = await cursor.toArray();
      res.send(semester);
    });
    app.get("/program", async (req, res) => {
      const query = {};
      const cursor = programCollection.find(query);
      const program = await cursor.toArray();
      res.send(program);
    });
    app.get("/course", async (req, res) => {
      const query = {};
      const cursor = courseCollection.find(query);
      const course = await cursor.toArray();
      res.send(course);
    });
    app.get("/classroom", async (req, res) => {
      const query = {};
      const cursor = classroomCollection.find(query);
      const classroom = await cursor.toArray();
      res.send(classroom);
    });
    app.get("/routin", async (req, res) => {
      const query = {};
      const cursor = routinCollection.find(query);
      const routin = await cursor.toArray();
      res.send(routin);
    });
    app.get("/university", async (req, res) => {
      const query = {};
      const cursor = universityCollection.find(query);
      const university = await cursor.toArray();
      res.send(university);
    });
    app.get("/district", async (req, res) => {
      const query = {};
      const cursor = districtCollection.find(query);
      const district = await cursor.toArray();
      res.send(district);
    });
    app.get("/upazila", async (req, res) => {
      const query = {};
      const cursor = upazilaCollection.find(query);
      const upazila = await cursor.toArray();
      res.send(upazila);
    });
    // Get Single Product by id
    app.get("/faculty/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await facultyCollection.findOne(query);
      res.send(product);
    });
    // Delete product
    app.delete("/faculty/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await facultyCollection.deleteOne(query);
      res.send(result);
    });
    // get review
    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });
    app.post("/facultyabsent", async (req, res) => {
      const facultyabsent = req.body;
      const result = await facultyabsentCollection.insertOne(facultyabsent);
      res.send(result);
    });
    app.post("/order", async (req, res) => {
      const order = req.body;
      const query = { productName: order.productName };
      const exists = await orderCollection.findOne(query);
      if (exists) {
        return res.send({ success: false, booking: exists });
      }
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
    app;
    // Book Order

    app.get("/order/:email", async (req, res) => {
      const email = req.params.email;
      if (email) {
        const query = { customarmail: email };
        const orders = await orderCollection.find(query).toArray();
        return res.send(orders);
      } else {
        return res.status(403).send({ message: "forbidden access" });
      }
    });
    // get order
    app.get("/order", async (req, res) => {
      const query = {};
      const cursor = orderCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app
      .get("/orders/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const order = await orderCollection.findOne(query);
        res.send(order);
      })
      // Information Post In server
      .post("/faculty", upload.single("image"), async (req, res) => {
        const facultyinfo = req.body;
        const result = await facultyCollection.insertOne(facultyinfo);
        res.send(result);
      })
      .post("/department", async (req, res) => {
        const department = req.body;
        const result = await departmentCollection.insertOne(department);
        res.send(result);
      })
      .post("/program", async (req, res) => {
        const program = req.body;
        const result = await programCollection.insertOne(program);
        res.send(result);
      })
      .post("/course", async (req, res) => {
        const course = req.body;
        const result = await courseCollection.insertOne(course);
        res.send(result);
      })
      .post("/classroom", async (req, res) => {
        const classroom = req.body;
        const result = await classroomCollection.insertOne(classroom);
        res.send(result);
      })
      .post("/routin", async (req, res) => {
        const routin = req.body;
        const result = await routinCollection.insertOne(routin);
        res.send(result);
      })
      .post("/university", async (req, res) => {
        const university = req.body;
        const result = await universityCollection.insertOne(university);
        res.send(result);
      })
      .post("/semester", async (req, res) => {
        const semester = req.body;
        const result = await semesterCollection.insertOne(semester);
        res.send(result);
      });
    // Delete order
    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });
    // Delete User
    app.delete("/user/:email", verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.deleteOne({ email: email });
      res.send(result);
    });
    // Get User & Admin
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user.role === "admin";
      res.send({ admin: isAdmin });
    });

    app.get("/user", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // Put user & Admin
    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.send({ result, token });
    });

    app.put("/user/admin/:email", verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Presidency App");
});
app.listen(port, () => {});
