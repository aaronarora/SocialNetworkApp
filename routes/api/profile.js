const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); //bring in and add a 2nd parameter to protect info
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//at route  GET api/profile/me
//@desc     get current users profile
//@access   Private
//Do you need a token to access that route? Unauthorized or authorized access
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name",
      "avatar"
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
