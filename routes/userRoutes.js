const router = require("express").Router();
const UserDB = require("../modules/User.js");
const CryptoJs = require("crypto-js");


const verifyToken = require("../verifyToken.js");


// Update User

router.put("/:id", verifyToken, async (req, res) => {
  if ( req.user.isAdmin || req.user.id === req.params.id) {
    if (req.body.password) {

      const newpass = await CryptoJs.AES.encrypt(
        req.body.password,
        process.env.ENCRYPT_KEY
      ).toString();

      req.body.password = newpass;

      try {
        const updateUser = await UserDB.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        const {  password, ...otherdata } = updateUser._doc;

        res.status(200).json(otherdata);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } else {
    res.status(403).json("You can only update your account");
  }

  console.log("update route working");
});

// delete user

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await UserDB.findByIdAndDelete(req.params.id);
      res.status(200).json("User Successfully Deleted");
    } catch (err) {
      res
        .status(403)
        .json("only delete your account! , you cannot delete Sorry ");
    }
  }
});

// GET THE USER

router.get("/find/:id", async (req, res) => {
  try {
    const user = await UserDB.findById(req.params.id);

    const { password, ...otherData } = user._doc;
    res.status(200).json(otherData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  GET ALL USER FOR ADMIN APP

router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const user = query
        ? await UserDB.find().sort({ _id: -1 }).limit(10)
        : await UserDB.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json(err);
    }
  } else {
    res.status(401).json("you are not allowed to see all users! ");
  }
});

// GET YOUR STATUS FOR ADMIN APP

router.get("/status", verifyToken, async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await UserDB.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
