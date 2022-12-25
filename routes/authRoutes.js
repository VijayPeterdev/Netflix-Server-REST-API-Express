const CryptoJs = require("crypto-js");
const User = require("../modules/User.js");
const router = require("express").Router();

const  jwt = require("jsonwebtoken");





const UserDB = require("../modules/User.js");

// Signup

router.post("/signup", async (req, res) => {
  const EncryptPassword = CryptoJs.AES.encrypt(
    req.body.password,
    process.env.ENCRYPT_KEY
  ).toString();


  const newUser = await new UserDB({
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    phonenumber: req.body.phonenumber,
    userimage: req.body.userimage,
    password: EncryptPassword,
  });

  try {
    const data = await newUser.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGN IN

router.post("/signin", async (req, res) => {
  try {
    const User = await UserDB.findOne({ username: req.body.username });

    console.log(User);

    !User && res.json("wrong username");

    const CryptoJS = require("crypto-js");

    const bytes = CryptoJS.AES.decrypt(User.password, process.env.ENCRYPT_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log("your password is " + originalText);


    originalText !== req.body.password && res.status(401).json("user password is wrong")

    const {password,...otherData} = User._doc

     const accessToken = jwt.sign({id: User._id, isAdmin : User.isAdmin},process.env.JWT_KEY,{expiresIn:"3d"});

    res.status(200).json({...otherData,accessToken})
  

    

  } catch (err) {
     console.log(err)
  }

  console.log("Sign in route working");
});

module.exports = router;
