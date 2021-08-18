const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check"); //might need to remove /check

//at route  POST api/users
//@desc     Register user
//@access   Public
//Do you need a token to access that route? Unauthorized or authorized access

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Bad request because info was not included
    }
    res.send("Users route");
  }
);

module.exports = router;
