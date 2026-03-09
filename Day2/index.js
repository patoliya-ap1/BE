const express = require("express");
const { middleware } = require("./middleware/middleware");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

const app = express();
app.use(express.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);

const Port = process.env.PORT || 7000;

app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
