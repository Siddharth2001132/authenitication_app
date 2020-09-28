const express = require("express");
const bcrypt = require("bcrypt");

const Joi = require("joi");
const router = express.Router();
const LogIn = require("../db/model");

const schema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@_-]+$"))
    .min(8)
    .max(30)
    .required(),
});

// any route in here is pre-pended with /auth

router.get("/", (req, res) => {
  res.json({
    message: "🔐",
  });
});

router.post("/signup", (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error == null){
    LogIn.findOne({
      username: req.body.username
    }).then(user => {
      if (user) {
        const error = new Error("The username already exist!");
        next(error);
      } else {
        bcrypt.hash(req.body.password, 12).then(async hashedPassword =>{
          const loginData = new LogIn({
            username: req.body.username,
            password: hashedPassword
          });
    
          const loginResult = await loginData.save();
          res.json(loginResult);
        })
      }
    });
    
  } else {
    next(result.error);
  }
  // console.log(result);
});

module.exports = router;
