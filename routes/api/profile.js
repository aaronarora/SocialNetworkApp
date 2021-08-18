const express = require("express");
const router = express.Router();

//at route  GET api/profile
//@desc     test route
//@access   Public
//Do you need a token to access that route? Unauthorized or authorized access
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
