// Require modules:
const express = require("express");
const morgan = require("morgan");

const port = 8000;

// Require handlers:
const { getHome } = require("./handlers/homeHandlers");


express()
.use(morgan('tiny'))
.use(express.json())


.get("/api/home", getHome)

// this is our catch all endpoint.
.get("*", (req, res) => {
res.status(404).json({
  status: 404,
  message: "This is obviously not what you are looking for.",
});
})


.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
