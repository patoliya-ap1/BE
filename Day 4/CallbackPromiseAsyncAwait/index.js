import express from "express";
import {
  getUser,
  getOrders,
  getOrdersProcess,
  orderPlaced,
} from "./utility/callback.js";
import {
  getOrdersProcessPromise,
  getOrdersPromise,
  getUserPromise,
  orderPlacedPromise,
} from "./utility/promises.js";

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to callback vs Promise vs async/await server." });
});

//before promise callback

app.get("/callbacks", (req, res) => {
  getUser(() => {
    getOrders(() => {
      getOrdersProcess(() => {
        orderPlaced((message) => {
          console.log(message);
          res.status(201).json({ message });
        });
      });
    });
  });
});

// promise consume .then ()

app.get("/promises", (req, res) => {
  getUserPromise()
    .then(getOrdersPromise)
    .then(getOrdersProcessPromise)
    .then(orderPlacedPromise)
    .then((response) => {
      res
        .status(201)
        .json({ message: response || "Order placed successfully." });
    });
});

// promise consume with async await

app.get("/async-await", async (req, res) => {
  const user = await getUserPromise();
  const order = await getOrdersPromise();
  const orderProcess = await getOrdersProcessPromise();
  const orderPlaced = await orderPlacedPromise();
  res.status(201).json({ message: orderPlaced });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
