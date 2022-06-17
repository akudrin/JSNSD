var express = require("express");
var router = express.Router();
const { Readable, Transform } = require("stream");
var finished = require("stream").finished;

router.get("/", function (req, res, next) {
  res.type("text/html");
  function stream() {
    const readable = Readable.from(
      ["this", "is", "a", "stream", "of", "data"].map((s) => s + "<br>")
    );
    const delay = new Transform({
      transform(chunk, enc, cb) {
        setTimeout(cb, 500, null, chunk);
      },
    });
    return readable.pipe(delay);
  }
  const streamResult = stream();
  streamResult.pipe(res, { end: false });

  finished(streamResult, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.end();
  });
});

module.exports = router;
