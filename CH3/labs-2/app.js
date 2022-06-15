"use strict";
const express = require("express");
const createError = require("http-errors");

const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("OK");
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
