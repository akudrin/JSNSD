"use strict";
const express = require("express");
const createError = require("http-errors");
const data = require("./data");

const port = 3000;
const app = express();

app.get("/", async (req, res) => {
  try {
    let response = await data();
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.use((req, res, next) => {
  if (req.method !== "GET") {
    next(createError(405));
    return;
  }
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
