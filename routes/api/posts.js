const express = require("express");
const router = express.Router();

//at route  GET api/auth
//@desc     test route
//@access   Public
//Do you need a token to access that route? Unauthorized or authorized access
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;
