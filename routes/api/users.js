const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check"); //might need to remove /check

const User = require("../../models/User");

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
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Bad request because info was not included
    }
    const { name, email, password } = req.body; //destructure and pull out name email password

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar, // creating a new instance of the user but before we save to database we need to encrpyt their password
        password
      });
      //Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10); //more rounds the more secure so 10
      user.password = await bcrypt.hash(password, salt);
      await user.save(); //anything that returns a promise put awake in front of

      const payload = {
        user: {
          id: user.id //mongoose allows for no underscore
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 }, //optional expiration
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    //Return jsonwebstoken
  }
);

module.exports = router;
