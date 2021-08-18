const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

//at route  GET api/auth
//@desc     test route
//@access   Public
//Do you need a token to access that route? Unauthorized or authorized access
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //leaves off pasword. We dont want that
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); //when you want to use middleware we will
//add it as a second parameter so I added auth

module.exports = router;
