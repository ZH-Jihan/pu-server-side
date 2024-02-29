const dotenv = require("dotenv").config();
const app = require("./app");
const dbConnect = require("./utils/dbConnect");


dbConnect()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})