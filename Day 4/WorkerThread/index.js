import express from "express";
import { Worker } from "worker_threads";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to worker thread server." });
});

app.get("/simple-route", (req, res) => {
  res.status(200).json({ message: "non blocking route" });
});

app.get("/blocking", (req, res) => {
  let total = 0;

  for (let i = 0; i <= 10000000000; i++) {
    total += i;
  }
  res.status(200).json({ message: "blocking route", total });
});

app.get("/non-blocking", (req, res) => {
  const worker = new Worker("./worker.js");
  worker.on("message", (message) => {
    console.log(message);
    res.status(200).json({ message: `non-blocking route - ${message}` });
  });
  worker.postMessage("");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
