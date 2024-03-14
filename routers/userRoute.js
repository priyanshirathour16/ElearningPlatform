const router = require("express").Router();

router.get("/hello", (req, res) => {
  res.status(200).json({
    success: true,
    message: "hello world",
  });
});

module.exports = router;
